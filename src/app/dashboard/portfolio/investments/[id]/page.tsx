"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvestmentSection, InvestmentItem, InvestmentDetailApiResponse } from "@/types/common/investment";
import { fetchPlanDetails } from "@/features/portfolio/services/planService";
import { Spinner } from "@/components/shared/spinner";
import { logger } from "@/lib/logger";
import ErrorState from "@/component/error/ErrorState"
import { ChevronLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function InvestmentDetailsPage() {

  const { id } = useParams();
  const [section, setSection] = useState<InvestmentSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlanDetails(id as string);

     
        const items: InvestmentItem[] = data.map((apiItem: InvestmentDetailApiResponse) => {
          const units = apiItem.totalSharesIssued + apiItem.totalSharesUnissued;
          const marketValue = apiItem.currentPrice * units;
          return {
            subject: `${apiItem.productName} ${apiItem.productType}`,
            supplierAccount: apiItem.supplierAccount,
            units,
            price: apiItem.currentPrice,
            marketValue,
            bookValue: null,
          };
        });

        const totalValue = items.reduce((total, item) => total + item.marketValue, 0);

        const transformedSection: InvestmentSection = {
          id: id as string,
          dealerAccountCode: id as string,
          name: `Plan: ${id}`,
          totalValue,
          items,
          balances: [],
        };

        setSection(transformedSection);
      } catch (err) {
        logger.error("Error fetching investment details:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch investment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Plan Details"
        message={error || "Something went wrong while fetching investment details."}
      />
    );
  }

  if (!section) {
    return (
      <div className="flex items-center justify-center h-40">
        <p>No investment details found</p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ChevronLeft className="mr-2 cursor-pointer hover:text-gray-600"
          onClick={() => router.back()} />
        {section.name}
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Subjects</TableHead>
              <TableHead>Supplier Account</TableHead>
              <TableHead className="text-right">Units</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Market Value</TableHead>
              <TableHead className="text-right">Book Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {section.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-xs whitespace-nowrap">
                  {(() => {
                    const match = item.subject.match(/^(FID-\d+)\s+(.*)$/);
                    if (match) {
                      return (
                        <>
                          <span className="text-black">{match[1]}</span>{" "}
                          <span className="text-muted-foreground">{match[2]}</span>
                        </>
                      );
                    }
                    return <span className="text-muted-foreground">{item.subject}</span>;
                  })()}
                </TableCell>
                <TableCell className="body-14-medium text-primary-600">{item.supplierAccount}</TableCell>
                <TableCell className="body-14-medium text-primary-600 text-right">
                  {item.units.toLocaleString()}
                </TableCell>
                <TableCell className="text-right body-14-medium text-primary-600">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right body-14-medium text-primary-600">
                  ${item.marketValue.toFixed(2)}
                </TableCell>
                <TableCell className="text-right body-14-medium text-primary-600">
                  {item.bookValue !== null ? `$${item.bookValue.toFixed(2)}` : ""}
                </TableCell>
              </TableRow>
            ))}

            {section.balances.map((balance, index) => (
              <TableRow key={`balance-${index}`}>
                <TableCell colSpan={6} className="text-muted-foreground text-sm">
                  {balance.type}
                </TableCell>
                <TableCell className="text-right font-medium text-sm">
                  {balance.value !== null ? `$${balance.value.toFixed(2)}` : ""}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={6} className="font-semibold text-sm">
                Total in CAD
              </TableCell>
              <TableCell className="text-right font-bold text-sm">
                ${section.totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { InvestmentSection, InvestmentItem, InvestmentDetailApiResponse } from "@/types/common/investment";
import { fetchPlanDetails } from "@/features/portfolio/services/planService";
import { Spinner } from "@/components/shared/spinner";
import { logger } from "@/lib/logger";



export default function InvestmentDetailsPage() {

  const { id } = useParams();
  const [section, setSection] = useState<InvestmentSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlanDetails(id as string);
        const transformedSection: InvestmentSection = {
          id: id as string,
          name: `Investment Plan ${id}`,
          totalValue: data.reduce((total: number, item: { currentPrice: number; totalSharesIssued: number; }) => {
            const marketValue = item.currentPrice * item.totalSharesIssued;
            return total + marketValue;
          }, 0),
          items: data.map((apiItem: InvestmentDetailApiResponse): InvestmentItem => ({
            subject: `${apiItem.productCode} ${apiItem.productType}`,
            supplierAccount: apiItem.supplierAccount,
            units: apiItem.totalSharesIssued,
            price: apiItem.currentPrice,
            marketValue: apiItem.currentPrice * apiItem.totalSharesIssued,
            bookValue: apiItem.currentPrice * apiItem.totalSharesIssued,
          })),
          balances: [],
          dealerAccountCode: ""
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
      <div className="flex items-center justify-center h-40">
        <p className="text-red-500">Error: {error}</p>
      </div>
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
      <h2 className="text-xl font-bold mb-4">{section.name}</h2>
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
              <TableHead className="text-center">Action</TableHead>
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
                <TableCell className="text-xs text-primary-600">{item.supplierAccount}</TableCell>
                <TableCell className="text-xs text-primary-600 text-right">
                  {item.units.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-xs text-primary-600">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-xs text-primary-600">
                  ${item.marketValue.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-xs text-primary-600">
                  ${item.bookValue.toFixed(2)}
                </TableCell>
                <TableCell className="text-center text-xs text-primary-600">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
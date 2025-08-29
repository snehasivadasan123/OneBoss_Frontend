import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CloseButton } from "./close-Button";
import Image from "next/image";

type Faqs = { question: string; answer: string };

const faqs: Faqs[] = [{
  question: "I have entered my email and password but it says I already have a session live.",
  answer:
    "This can sometimes occur after a password reset or if you recently left the website without signing out. Click the LOGOUT button shown on the screen when prompted to fully sign out, then sign in again to regain access.",
},
{
  question: "I have forgotten my password, but when I complete the reset I do not see anything in my email inbox.",
  answer:
    "Your email provider may filter the reset email into Junk or Spam. Delivery can be delayed—please allow up to 10 minutes before requesting another reset email. Be sure to check your junk, spam, or promotions folders.",
},
{
  question: "I share my email address with another user. Why can only one of us obtain access?",
  answer:
    "A single email can be used for multiple user accounts, but each must have a unique password. If both users share the same password, one can lock the other out. Reset passwords separately via the Forgot Password button for each account.",
},
{
  question: "I am typing my password in but it keeps saying it is invalid. What should I do?",
  answer:
    "Ensure Caps Lock is off and that your email/username is correct. Try typing your password into a text editor first to verify characters, then copy and paste it into the login field. If it still fails, reset your password using the Forgot Password option.",
},
{
  question:
    "I am trying to login with my email and I know my password is done correctly. What is stopping me from getting in?",
  answer:
    "If you recently changed your email, it might not be updated yet by your representative or dealer. Since the system uses the email we have on file, please contact them to confirm your email so you can be recognized on login.",
},
{
  question: "I have tried the tips above and nothing seems to be working. What can I do?",
  answer:
    "Contact support for assistance. Be ready to answer a brief security question before a password reset. Help can only be provided to the account owner unless permission has been granted otherwise.",
},
];
export default function HelpCenter() {
  return (<div className="container mx-auto px-4">
    <Card className="relative mx-auto w-full max-w-4xl border-border/60 shadow-sm">

      <div className="flex items-start justify-between gap-4 p-5 md:p-6">
        <div className="flex items-center gap-3">

          <div className="flex justify-center mb-2">
            <Image
              src="/image/logo.svg"
              alt="Logo"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
            <h1 className="text-pretty text-lg font-semibold md:text-xl ml-2">How can we help you Today!</h1>
          </div>
        </div>
        <CloseButton />
      </div>
      <Separator />
      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <ul className="space-y-4">
          {faqs.map((item, idx) => (
            <li key={idx}>
              <p className="text-sm font-medium leading-6">{item.question}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.answer}</p>
              {idx < faqs.length - 1 && <Separator className="mt-4" />}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  </div>
  )
}
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    try {
      await apiRequest(
        "POST", 
        "/api/auth/forgot-password",
        data
      );
      
      setEmailSent(true);
      
      toast({
        title: "Email sent",
        description: "If an account with that email exists, we've sent instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>
              {emailSent 
                ? "Check your email for the reset link" 
                : "Enter your email and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 text-green-700 p-4 rounded-md">
                  We've sent instructions to reset your password to the email address you provided.
                  Please check your inbox and follow the link to reset your password.
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button 
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    setEmailSent(false);
                    form.reset();
                  }}
                >
                  Try another email
                </Button>
                <Button 
                  className="mt-2 w-full"
                  onClick={() => setLocation("/sign-in")}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Enter your email address"
                              className="pl-10"
                              {...field}
                              type="email"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          
          {!emailSent && (
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/sign-in" className="font-medium text-primary-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
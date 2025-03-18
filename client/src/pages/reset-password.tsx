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
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  token: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  
  // Get token from URL query param
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const token = searchParams.get('token') || '';

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token
    },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    if (!data.token) {
      toast({
        title: "Invalid reset link",
        description: "The password reset link is invalid or expired. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest(
        "POST", 
        "/api/auth/reset-password",
        data
      );
      
      setResetCompleted(true);
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset successfully. You can now sign in with your new password.",
      });
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message || "Failed to reset password. The link may be expired or invalid.",
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
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              {resetCompleted 
                ? "Your password has been reset successfully" 
                : "Create a new password for your account"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {resetCompleted ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 text-green-700 p-4 rounded-md">
                  Your password has been updated successfully. You can now sign in with your new password.
                </div>
                <Button 
                  className="mt-4 w-full"
                  onClick={() => setLocation("/sign-in")}
                >
                  Go to Sign In
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOffIcon className="h-4 w-4 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your new password"
                              className="pl-10"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOffIcon className="h-4 w-4 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input
                            type="hidden"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Resetting Password..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          
          {!resetCompleted && (
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
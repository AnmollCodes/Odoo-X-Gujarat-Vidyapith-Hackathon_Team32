import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Marketplace from "@/pages/marketplace";
import FarmerProfile from "@/pages/farmer-profile";
import ProductDetails from "@/pages/product-details";
import Verify from "@/pages/verify";
import SignIn from "@/pages/sign-in";
import Register from "@/pages/register";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import About from "@/pages/about";
import ForFarmers from "@/pages/for-farmers";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Home} />
      <ProtectedRoute path="/marketplace" component={Marketplace} />
      <ProtectedRoute path="/farmer/:id" component={FarmerProfile} />
      <ProtectedRoute path="/product/:id" component={ProductDetails} />
      <ProtectedRoute path="/verify" component={Verify} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/about" component={About} />
      <Route path="/for-farmers" component={ForFarmers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

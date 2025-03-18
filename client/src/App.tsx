import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Marketplace from "@/pages/marketplace";
import FarmerProfile from "@/pages/farmer-profile";
import ProductDetails from "@/pages/product-details";
import Verify from "@/pages/verify";
import SignIn from "@/pages/sign-in";
import Register from "@/pages/register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/marketplace" component={Marketplace}/>
      <Route path="/farmer/:id" component={FarmerProfile}/>
      <Route path="/product/:id" component={ProductDetails}/>
      <Route path="/verify" component={Verify}/>
      <Route path="/sign-in" component={SignIn}/>
      <Route path="/register" component={Register}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

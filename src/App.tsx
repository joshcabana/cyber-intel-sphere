import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Matrix from "./pages/Matrix";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Pro from "./pages/Pro";
import About from "./pages/About";
import Referral from "./pages/Referral";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AIUse from "./pages/AIUse";
import Corrections from "./pages/Corrections";
import Methodology from "./pages/Methodology";
import Tools from "./pages/Tools";
import Assessment from "./pages/Assessment";
import Newsletter from "./pages/Newsletter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/matrix" element={<Matrix />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/pro" element={<ProtectedRoute><Pro /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/r/:code" element={<Referral />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ai-use" element={<AIUse />} />
            <Route path="/corrections" element={<Corrections />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

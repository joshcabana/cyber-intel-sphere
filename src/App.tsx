import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Matrix from "./pages/Matrix";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Pro from "./pages/Pro";
import NotFound from "./pages/NotFound";

// Lazy-loaded secondary pages
const About = lazy(() => import("./pages/About"));
const Referral = lazy(() => import("./pages/Referral"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const AIUse = lazy(() => import("./pages/AIUse"));
const Corrections = lazy(() => import("./pages/Corrections"));
const Methodology = lazy(() => import("./pages/Methodology"));
const Tools = lazy(() => import("./pages/Tools"));
const Assessment = lazy(() => import("./pages/Assessment"));
const Newsletter = lazy(() => import("./pages/Newsletter"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-sm font-mono text-muted-foreground animate-pulse">Loading…</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ErrorBoundary>
            <Suspense fallback={<LazyFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
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
            </Suspense>
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

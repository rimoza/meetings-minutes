import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, CheckCircle, Clock, Users, Sparkles } from "lucide-react";

const Login = () => {
  const handleGoogleLogin = () => {
    console.log("Google login clicked - functionality to be implemented");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl">
              <CalendarCheck className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Tidy Meets</h1>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-lg font-medium text-muted-foreground">Organize your meetings efficiently</p>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-muted/50">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold text-center tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-center text-base">
              Sign in to manage your meetings and stay organized
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In Button */}
            <Button 
              onClick={handleGoogleLogin}
              className="w-full h-12 text-base font-semibold relative shadow-sm hover:shadow-md transition-shadow"
              variant="outline"
              size="lg"
            >
              <svg 
                className="h-5 w-5 mr-3" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure authentication
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-base text-muted-foreground">
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
                <span className="font-medium">Sync meetings across all devices</span>
              </div>
              <div className="flex items-center gap-3 text-base text-muted-foreground">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Real-time notifications and reminders</span>
              </div>
              <div className="flex items-center gap-3 text-base text-muted-foreground">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <span className="font-medium">Collaborate with team members</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center text-base text-muted-foreground font-medium">
          <p>© 2024 Tidy Meets. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
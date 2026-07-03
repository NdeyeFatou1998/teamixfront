import { AlertCircle } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function QueryError({ message }: { message: string }) {
  return (
    <Card className="border-red-500/30 bg-red-500/10">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div>
          <CardTitle className="text-base text-red-300">Erreur de chargement</CardTitle>
          <CardDescription className="text-red-200/80">{message}</CardDescription>
        </div>
      </div>
    </Card>
  );
}

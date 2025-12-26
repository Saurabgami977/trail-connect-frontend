"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import RouteForm from "../../create/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getTrekTemplateById } from "@/api/routes/trek-template";

export default function EditRoutePage() {
  const { id } = useParams();
  const router = useRouter();
  const params = useParams();
  const [route, setRoute] = useState<any>(null);
  const {
    data: TemplateData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["templateData", id],
    queryFn: () => getTrekTemplateById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (!isPending && TemplateData) {
      setRoute(TemplateData);
    }
    if (isError) {
      toast.error("Failed to load route data.");
    }
  }, [id, isPending, TemplateData, isError]);

  const handleSuccess = () => {
    router.push("/user/trekking-routes");
    router.refresh();
  };

  const handleCancel = () => {
    router.push("/user/trekking-routes");
  };

  if (isPending) {
    return (
      <div className="container mx-auto p-6 mt-20 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading route data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="mb-6">
        <Button variant="outline" onClick={handleCancel} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Routes
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Trekking Route</CardTitle>
            <CardDescription>
              Update the details for {route?.name || "this trekking route"}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {route && (
              <RouteForm
                route={route}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

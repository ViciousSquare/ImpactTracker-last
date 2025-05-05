import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ActivityLog = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sample activity items */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
              <span className="material-icons text-muted-foreground">history</span>
              <div>
                <p className="text-sm font-medium">Sample Activity {i}</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
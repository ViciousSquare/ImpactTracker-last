
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SECTORS = ["Food Security", "Housing", "Education", "Environment", "Health & Wellbeing"];
const REGIONS = ["North America", "Europe", "Asia", "Africa", "South America", "Oceania"];
const SDG_OPTIONS = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-being",
  "Quality Education",
  "Gender Equality",
  // Add more SDGs as needed
];

interface AddOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export const AddOrganizationDialog = ({ open, onOpenChange, onSubmit }: AddOrganizationDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    sdgAlignment: [],
    region: '',
    established: '',
    contactInfo: '',
    website: '',
    contactEmail: '',
    impactScore: '',
    grade: '',
    reportingQuality: '',
    reach: '',
    socialROI: '',
    outcomeEffectiveness: '',
    transparencyGovernance: '',
    verificationType: 'self-reported',
    methodologySource: '',
    methodologySummary: '',
    reports: '',
    keyMetrics: '',
    insights: '',
    programs: '',
    targetPartners: '',
    adminNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
          <DialogDescription>
            Enter organization details and impact assessment data
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({...formData, sector: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((sector) => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add more form fields following the same pattern */}
            {/* Impact IQ & Methodology Section */}
            <div className="space-y-2">
              <Label htmlFor="impactScore">Impact IQ Score</Label>
              <Input
                id="impactScore"
                type="number"
                max="100"
                value={formData.impactScore}
                onChange={(e) => setFormData({...formData, impactScore: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationType">Verification Level</Label>
              <Select
                value={formData.verificationType}
                onValueChange={(value) => setFormData({...formData, verificationType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self-reported">Self-Reported</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="audited">Audited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="methodologySummary">Methodology Summary</Label>
            <Textarea
              id="methodologySummary"
              value={formData.methodologySummary}
              onChange={(e) => setFormData({...formData, methodologySummary: e.target.value})}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Organization</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

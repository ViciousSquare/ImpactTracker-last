
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { FileInput } from "@/components/ui/file-input";
import { SECTOR_OPTIONS, REGION_OPTIONS, SDG_OPTIONS, ImpactGrade, VerificationType } from '@/lib/types';

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
    executiveInfo: '',
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
    adminNotes: '',
    jsonData: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const jsonData = JSON.parse(e.target.value);
      setFormData({ ...formData, ...jsonData });
    } catch (error) {
      console.error('Invalid JSON format');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
          <DialogDescription>
            Enter organization details and impact assessment data
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-muted rounded-lg mb-6">
            <Label>Quick JSON Upload</Label>
            <Textarea
              placeholder="Paste JSON data here to auto-fill form"
              className="mt-2"
              rows={4}
              onChange={handleJsonUpload}
            />
          </div>

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
                  {SECTOR_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>SDG Alignment</Label>
              <MultiSelect
                options={SDG_OPTIONS}
                value={formData.sdgAlignment}
                onChange={(value) => setFormData({...formData, sdgAlignment: value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData({...formData, region: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="established">Year Established</Label>
              <Input
                id="established"
                type="number"
                value={formData.established}
                onChange={(e) => setFormData({...formData, established: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="executiveInfo">Executive Director/Communications Lead</Label>
              <Input
                id="executiveInfo"
                placeholder="Name and email"
                value={formData.executiveInfo}
                onChange={(e) => setFormData({...formData, executiveInfo: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Best Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              />
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Impact IQ & Methodology</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="impactScore">Impact IQ Score (0-100)</Label>
                <Input
                  id="impactScore"
                  type="number"
                  max="100"
                  value={formData.impactScore}
                  onChange={(e) => setFormData({...formData, impactScore: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => setFormData({...formData, grade: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ImpactGrade).map((grade) => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportingQuality">Reporting Quality (0-20)</Label>
                <Input
                  id="reportingQuality"
                  type="number"
                  max="20"
                  value={formData.reportingQuality}
                  onChange={(e) => setFormData({...formData, reportingQuality: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reach">Reach (0-20)</Label>
                <Input
                  id="reach"
                  type="number"
                  max="20"
                  value={formData.reach}
                  onChange={(e) => setFormData({...formData, reach: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialROI">Est. Social ROI (0-20)</Label>
                <Input
                  id="socialROI"
                  type="number"
                  max="20"
                  value={formData.socialROI}
                  onChange={(e) => setFormData({...formData, socialROI: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcomeEffectiveness">Outcome Effectiveness (0-20)</Label>
                <Input
                  id="outcomeEffectiveness"
                  type="number"
                  max="20"
                  value={formData.outcomeEffectiveness}
                  onChange={(e) => setFormData({...formData, outcomeEffectiveness: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transparencyGovernance">Transparency & Governance (0-20)</Label>
                <Input
                  id="transparencyGovernance"
                  type="number"
                  max="20"
                  value={formData.transparencyGovernance}
                  onChange={(e) => setFormData({...formData, transparencyGovernance: e.target.value})}
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
                    {Object.values(VerificationType).map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="methodologySource">Methodology Source</Label>
              <Input
                id="methodologySource"
                value={formData.methodologySource}
                onChange={(e) => setFormData({...formData, methodologySource: e.target.value})}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="methodologySummary">Methodology Summary</Label>
              <Textarea
                id="methodologySummary"
                value={formData.methodologySummary}
                onChange={(e) => setFormData({...formData, methodologySummary: e.target.value})}
                rows={4}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="reports">Reports/Documents</Label>
              <FileInput
                id="reports"
                accept=".pdf,.doc,.docx"
                onChange={(files) => setFormData({...formData, reports: files})}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Insights & Metrics</h3>
            
            <div className="space-y-2">
              <Label htmlFor="keyMetrics">Key Statistics/KPIs</Label>
              <Textarea
                id="keyMetrics"
                value={formData.keyMetrics}
                onChange={(e) => setFormData({...formData, keyMetrics: e.target.value})}
                rows={4}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="insights">Key Insights and Recommendations</Label>
              <Textarea
                id="insights"
                value={formData.insights}
                onChange={(e) => setFormData({...formData, insights: e.target.value})}
                rows={4}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="programs">Programs</Label>
              <Textarea
                id="programs"
                value={formData.programs}
                onChange={(e) => setFormData({...formData, programs: e.target.value})}
                placeholder="Enter programs (one per line)"
                rows={4}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="targetPartners">Key Target Members/Partners</Label>
              <Textarea
                id="targetPartners"
                value={formData.targetPartners}
                onChange={(e) => setFormData({...formData, targetPartners: e.target.value})}
                placeholder="Enter partners (one per line)"
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-2 border-t pt-6">
            <Label htmlFor="adminNotes">Admin Notes</Label>
            <Textarea
              id="adminNotes"
              value={formData.adminNotes}
              onChange={(e) => setFormData({...formData, adminNotes: e.target.value})}
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

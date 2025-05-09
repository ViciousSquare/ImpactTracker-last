The code is modified to update the JSON parsing logic within the AddOrganizationDialog component to align with the new JSON schema provided in the user message.
```

```replit_final_file
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
    yearEstablished: '', // Changed to yearEstablished
    contactInfo: '',
    website: '',
    contactEmail: '',
    executiveInfo: '',
    impactScore: '',
    grade: '',
    reportingQuality: '',
    reach: '',
    estSocialRoi: '', // Changed to estSocialRoi
    outcomeEffectiveness: '',
    transparencyGovernance: '',
    verificationLevel: '', // Changed to verificationLevel
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

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let orgData = formData;
      if (formData.jsonData) {
        try {
            const parsedData = JSON.parse(formData.jsonData);
            orgData = {
              name: parsedData.organization_name || formData.name,
              sector: parsedData.sector || formData.sector,
              sdgAlignment: parsedData.sdg_alignment || formData.sdgAlignment,
              region: parsedData.region || formData.region,
              yearEstablished: parsedData.year_established || formData.yearEstablished,
              contactInfo: parsedData.contact_info || formData.contactInfo,
              website: parsedData.website || formData.website,
              bestContact: parsedData.best_contact || { name: '', email: '', role: '' },
              impactScore: parsedData.impact_iq_score || formData.impactScore,
              grade: parsedData.grade || formData.grade,
              reportingQuality: parsedData.reporting_quality || formData.reportingQuality,
              reach: parsedData.reach || formData.reach,
              estSocialRoi: parsedData.est_social_roi || formData.estSocialRoi,
              outcomeEffectiveness: parsedData.outcome_effectiveness || formData.outcomeEffectiveness,
              transparencyGovernance: parsedData.transparency_governance || formData.transparencyGovernance,
              verificationLevel: parsedData.verification_level || formData.verificationLevel,
              methodologySource: parsedData.methodology_source || formData.methodologySource,
              methodologySummary: parsedData.methodology_summary || formData.methodologySummary,
              reportsDocuments: parsedData.reports_documents_used || [],
              keyStatistics: parsedData.key_statistics_kpis || [],
              keyInsights: parsedData.key_insights_about_org || [],
              programs: parsedData.programs || [],
              targetPartners: parsedData.key_target_members_partners || [],
              adminNotes: parsedData.admin_notes || '',
              impactAnalysis: parsedData.impact_analysis || {
                executiveSummary: '',
                keyStrengths: [],
                areasForDevelopment: [],
                sectorPositioning: '',
                conclusion: ''
              },
              recommendations: parsedData.recommendations || [],
              financials: parsedData.financials || {
                revenue: null,
                expenditures: null,
                programExpensesPct: null,
                fundraisingPct: null,
                adminPct: null,
                surplus: null,
                fundingSources: {
                  institutional: null,
                  individual: null,
                  government: null,
                  other: null
                }
              }
            };
        } catch (error) {
          toast({
            title: "Error",
            description: "Invalid JSON format. Please check your input.",
            variant: "destructive"
          });
          return;
        }
      }

      await onSubmit(orgData);
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Organization has been successfully added",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization. Please try again.",
        variant: "destructive"
      });
    }
  };


  const handleJsonUpload = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, jsonData: e.target.value });
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
              <Label htmlFor="yearEstablished">Year Established</Label>
              <Input
                id="yearEstablished"
                type="number"
                value={formData.yearEstablished}
                onChange={(e) => setFormData({...formData, yearEstablished: e.target.value})}
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
                <Label htmlFor="estSocialRoi">Est. Social ROI (0-20)</Label>
                <Input
                  id="estSocialRoi"
                  type="number"
                  max="20"
                  value={formData.estSocialRoi}
                  onChange={(e) => setFormData({...formData, estSocialRoi: e.target.value})}
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
                <Label htmlFor="verificationLevel">Verification Level</Label>
                <Select
                  value={formData.verificationLevel}
                  onValueChange={(value) => setFormData({...formData, verificationLevel: value})}
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
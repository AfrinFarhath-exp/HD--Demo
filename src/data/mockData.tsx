import type { IdocIssue, SuggestedQuestion, ReportType, CountryPerformance } from '../types';

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: '1', text: 'Issues with Idoc processing', type: 'idoc' },
  { id: '2', text: 'Idoc status monitoring best practices', type: 'idoc' },
  { id: '3', text: 'Common Idoc errors and solutions', type: 'idoc' },
  { id: '4', text: 'How to troubleshoot Idoc transmission failures', type: 'idoc' },
  { id: '5', text: 'SAP GOP pushes tax proposal updates', type: 'general' },
  { id: '6', text: 'Microsoft layoffs amid AI focus shift', type: 'general' },
  { id: '7', text: 'Supply chain inflation trends in April', type: 'general' },
  { id: '8', text: 'New ERP integration requirements', type: 'general' },
];

export const idocIssues: IdocIssue[] = [
  {
    id: '1',
    title: 'Idoc stuck in "Ready for Processing" status',
    description: 'Idocs remain in the "Ready for Processing" status and never move to the next step.',
    solution: 'This issue is commonly caused by a missing background job or process scheduler configuration. Check that the RBDAPP00 job is running correctly in transaction SM37. If the job is missing, create a new background job in SM36 with proper scheduling parameters. Additionally, verify process scheduler settings in transaction SMQS to ensure it\'s properly configured for Idoc processing. Restart the process after making these changes.'
  },
  {
    id: '2',
    title: 'Idoc format error: Structure mismatch',
    description: 'Idoc fails with error "Structure does not match expected format".',
    solution: 'This error occurs when the Idoc structure differs from what the receiving system expects. First, check the Idoc type and segment definitions in WE31. Compare the structure with the expected format in the receiving system. You may need to update the Idoc basic type or extend it using custom segments in WE30. Additionally, verify that both systems have the same version of the Idoc type and that any recent changes have been properly transported.'
  },
  {
    id: '3',
    title: 'Idoc transmission failure',
    description: 'Idoc fails to transmit to external system with communication errors.',
    solution: 'Communication failures can be caused by network issues, incorrect RFC destinations, or middleware problems. First, check the RFC connection in SM59 and test the connection. Verify that the destination server is available and that all firewall rules allow the communication. If using middleware like PI/PO, check the integration flow and message monitoring for errors. Also verify tRFC/qRFC settings in transaction SMQS if asynchronous processing is being used.'
  },
  {
    id: '4',
    title: 'Duplicate Idoc creation',
    description: 'System creates multiple identical Idocs for the same business transaction.',
    solution: 'Duplicate Idocs often result from incorrect configuration or application logic issues. Check the application that triggers Idoc creation to ensure it\'s not calling the creation function multiple times. Review any custom enhancements or user exits that might be causing this behavior. Implement a check in your code to verify if an Idoc for the specific business object already exists before creating a new one. Additionally, consider implementing a locking mechanism during the transaction processing.'
  },
  {
    id: '5',
    title: 'Idoc processing performance issues',
    description: 'Idoc processing is extremely slow, causing backlogs.',
    solution: 'Slow Idoc processing can be caused by various factors. Check table EDIDS for the volume of Idocs being processed. Use transaction SMLG to analyze performance. Consider increasing the number of tRFC or qRFC scheduler processes in SMQS. Review any custom processing logic that might be inefficient. For large volumes, implement batch processing strategies and optimize database operations. Also check for database locks or contention issues that might be slowing down processing.'
  },
  {
    id: '6',
    title: 'Idoc content errors (missing data)',
    description: 'Idoc is created but with missing or incorrect data fields.',
    solution: 'Content errors typically stem from application logic or master data issues. First, trace the Idoc creation using transaction BD87 to see where the data is sourced from. Check the corresponding application tables and master data for completeness. Review any mapping logic or user exits that transform the data. If using ALE, verify the distribution model and filter settings in BD64. For complex mappings, consider implementing data validation before Idoc creation to catch errors early.'
  },
  {
    id: '7',
    title: 'Idoc status update failure',
    description: 'Idoc status is not updating correctly after processing steps.',
    solution: 'Status update failures can indicate issues with the processing workflow or database problems. Check transaction WE02 to see the detailed status history. Verify that the processing program has proper authorization to update Idoc status. Look for any errors in the system log (SM21) that might indicate failed updates. If custom status handling is implemented, review the code for logical errors. In some cases, you may need to manually correct the status using transaction WE09, but address the root cause to prevent recurrence.'
  },
  {
    id: '8',
    title: 'Idoc archiving issues',
    description: 'Problems with archiving old Idocs or accessing archived Idocs.',
    solution: 'Archiving issues can impact system performance and compliance. Check your archiving object settings in SARA transaction. Verify that the Idoc archiving program (RSEOUT00) is executing correctly. For access problems with archived Idocs, ensure the archive storage system is properly connected and that users have the necessary authorizations. If Idocs need to be retrieved from archives, use transaction SARA with the appropriate retrieval program. Consider implementing a proper archiving strategy with retention periods aligned to your business needs.'
  },
];

export const reportTypes: ReportType[] = [
  { id: '1', title: 'Backorder Weekly Report', description: 'Shows pending backorders and their status', icon: 'file-clock' },
  { id: '2', title: 'eCommerce Team Revenue Report', description: 'Revenue breakdown by eCommerce channels', icon: 'shopping-cart' },
  { id: '3', title: 'EU Daily Report', description: 'Daily performance metrics for European markets', icon: 'globe-europe' },
  { id: '4', title: 'Fraud Order Monthly Report', description: 'Overview of detected fraudulent orders', icon: 'shield-alert' },
  { id: '5', title: 'GWP Orders Report', description: 'Gift with purchase order analysis', icon: 'gift' },
  { id: '6', title: 'ISOS Order Report', description: 'International SOS order status and fulfillment', icon: 'truck' },
  { id: '7', title: 'Returns Report', description: 'Analysis of product returns and reasons', icon: 'rotate-ccw' },
  { id: '8', title: 'SMGM Orders Report', description: 'Social media generated orders metrics', icon: 'share-2' },
  { id: '9', title: 'SAC Report', description: 'Service account compliance reporting', icon: 'clipboard-check' },
];

export const generateMockReportData = (startDate: Date, endDate: Date): CountryPerformance[] => {
  const countries: CountryPerformance[] = [
    {
      country: 'United States',
      metrics: {
        orders: Math.floor(Math.random() * 5000) + 10000,
        revenue: Math.floor(Math.random() * 1000000) + 2000000,
        returns: Math.floor(Math.random() * 500) + 500,
        conversion: parseFloat((Math.random() * 5 + 3).toFixed(2)),
        avgOrderValue: parseFloat((Math.random() * 200 + 150).toFixed(2))
      }
    },
    {
      country: 'Germany',
      metrics: {
        orders: Math.floor(Math.random() * 3000) + 5000,
        revenue: Math.floor(Math.random() * 800000) + 1000000,
        returns: Math.floor(Math.random() * 300) + 200,
        conversion: parseFloat((Math.random() * 4 + 2).toFixed(2)),
        avgOrderValue: parseFloat((Math.random() * 180 + 130).toFixed(2))
      }
    }
  ];
  
  return countries;
};
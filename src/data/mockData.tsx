import type { IdocIssue, SuggestedQuestion } from "../types";

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: "1", text: "I have an issue with Idoc", type: "idoc" },
  {
    id: "2",
    text: "Postal code error: must have a length of 7 ",
    type: "idoc",
  },
  {
    id: "3",
    text: "No customer master record exists for sold to party",
    type: "idoc",
  },
];

export const idocIssues: IdocIssue[] = [
  {
    id: " 1",
    title: "The postal code XXXXXX must have a length of 7",
    description: "The postal code XXXXXX must have a length of 7",
    solution:
      "• Experion will start fixing this only for US, CA and NL. \n\n • From the list in the above screenshot, double click and open the order that has this error. \n\n • Expand the data records tree view and there are 3 sub nodes to be checked for this error those are ending with (WE - Sending it to someone else or gift to a friend ZF – Fulfilment ZB - Billing). \n\n • The postal codes will be available in all these 3 sub nodes \n\n Check if all postal code in these nodes has 7 digits. Example (1234 AB), In some cases space will be missing after the first 4 digits and that might be the reason for the issue.  \n\n • So, in all the 3 sub-nodes, we must correct this. \n\n • To get into it for fix it we double click on the sub node where the fix is required, from the “data record” menu we click on “Display Change” that allows to edit the order and save \n\n • Copy the iDOC number and go back to previous screen \n\n • To fulfill this order, we need to process it. To do that we need to open a new window with a transaction code and click enter /obd87 \n\n • Paste the iDOC number in text box and click on execute icon Picture 979118711, Picture \n\n • The item will load in the list and then highlight the orders and click on processPicture 978601485, Picture icon to fulfill the order. \n\n • If the loaded order number in the list is grey color, then the fix was correct, if the line items is red in color, then the issue still persists. Needs to be corrected again. \n\n • Another way to confirm if this order is processed successfully is grab the order number from 001 Sub node. Go to a new transaction page /0va03.  \n\n • Paste the order number and search and if the order pops up in the list, then we are all good.  ",
  },
  {
    id: "2",
    title: "Postal code XXXXXXXX must have the length 9",
    description: "Postal code XXXXXXXX must have the length 9",
    solution:
      "• Since the issue is with the length of 9. It must be a European order basically \n\n • Get into the sub node in Data Records that ends with ZB (Billing address) and check the postal code in it. Mostly that will be having length of 8. \n\n • Get into the sub in Data Records that ends with ZF (Fulfillment address) that will have a different Postal code. \n\n • Based on the experience of ERIC this seems to be a US order that can be seen in the ZF sub node. We don't have to bother about the Billing address. \n\n • So, copy the data from ZF and paste it in ZB. \n\n • Replace data in STRAS, ORT01, PSTLZ, REGIO from ZF to ZB. Both column names are the same in both nodes. \n\n • Replace data in COUNC - ZF to LAND1 in ZB \n\n • After replacing the data save the idoc and get back to the previous screen and copy the iDoc  \n\n • /obd87 to open a new window  \n\n • Paste the iDoc number and click on the execute button Picture 979118711, Picture \n\n • The edited version of data pops up, highlight on the order in the tree view and click on process button Picture 979118711, Picture \n\n • As long as the data loads up in grey color it is all good.  ",
  },
  {
    id: "3",
    title: "Postal code XXXXXXXX must have the length 5 or 10",
    description: "Postal code XXXXXXXX must have the length 5 or 10.",
    solution:
      "• Get into the sub node in Data Records that ends with ZB (Billing address) and check the postal code in it. It should be of 9 \n\n • Check the ZB (mostly it will be greater that length of 5) \n\n • Check ZF if the order is US and if yes, come back to ZB and make the postal code to length of 5 (i.e., remove extra digits) \n\n • Continue the rest of the process and execute the order \n\n • If when the order is processed and the error is still there, then copy the ZF to ZB and execute again like a length 9 issue  ",
  },
  {
    id: "4",
    title: " No customer master record exists for sold to party – Scenario I",
    description:
      " No customer master record exists for sold to party – Scenario I.",
    solution:
      "• This error means that there was no dealer assigned to the order. \n\n • There is an automated process that runs in backend that takes these records every 30 minutes and re processed them to assign the dealer to it. \n\n • So, all we need to do is verify if the dealer is assigned to the order by following the steps below. \n\n • Double click and open this record. \n\n • Click on the Sub node under the Data records that ends with 001. \n\n • Copy the ecommerce order number from the window (BELNR) \n\n • If this order is in SAP, then that mean the dealer is assigned \n\n • The transaction code to pull up and order and see if it there is SAP is /ova03 \n\n • Paste the order number in the newly opened window against purchase order number text box and click on search button. \n\n • If the order pulls up and shows below see if the SOLD TO PARTY has data in it \n\n • If the data is present, then the order is available in SAP and is all good. \n\n • Now go back to the previous screen, copy the iDOC number of the order \n\n • All we need to do is archive \n\n • The transaction code to archive an order is /ozbc01 \n\n • Paste the iDOC number in the archive window that opened \n\n • Uncheck the “Test” Check box and click on the process button Picture 979118711, Picture  that will archive the order from SAP. ",
  },
  {
    id: "5",
    title: "No customer master record exists for sold to party – Scenario II ",
    description:
      "No customer master record exists for sold to party – Scenario II ",
    solution:
      "• This error means that there was no dealer assigned to the order. \n\n • There is an automated process that runs in backend that takes these records every 30 minutes and re processed them to assign the dealer to it. \n\n • So, all we need to do is verify if the dealer is assigned to the order by following the steps below. \n\n • Double click and open this record. \n\n • Click on the Sub node under the Data records that ends with 001. \n\n • Copy the ecommerce order number from the window (BELNR) \n\n • If this order is in SAP, then that mean the dealer is assigned \n\n • The transaction code to pull up and order and see if it there is SAP is /ova03 \n\n • Paste the order number in the newly opened window against purchase order number text box and click on search button. \n\n • If the order doesn't pull up, then we need to wait for a day or 2. \n\n • Even after the 2 days wait the order is not pulling up in the SAP then we need to inform Eric. ",
  },
  {
    id: "6",
    title:
      "Sold-to party XXXXXXX not maintained for sales area XXXXXXXX (405 error) ",
    description:
      "Sold-to party XXXXXXX not maintained for sales area XXXXXXXX (405 error) ",
    solution:
      "• This error means that there was some issue with the dealer number and the postal codes may have changed \n\n • Open the order number and from the data records tree view under the node ending with ZB. We know it's a Canadian order and the region is Ontario. What happened here is the dealer was not assigned correctly. \n\n • Sometimes ZB will not have correct region, in that case check ZF to confirm if it is a Canadian order. \n\n • Open the next node ZH where the dealer assignment will be 0405 which is not a Canadian dealer. Row name will be PARTN \n\n • There is an excel sheet in share point that has dealer id and details about all the dealers in different regions. \n\n • Open that sheet and take any dealer id from the Canada – Ontario region since the order belong to Ontario region that is visible in the ZB node. \n\n • Double click and open ZH node in edit mode and then replace the dealer id with the copied id from the excel sheet and save it. \n\n • Next in ZF node the postal code will also be missing the last three digits in this case always. \n\n • Copy the postal code from ZB and replace it with the postal code in ZF and save. \n\n • Next Double click and open AG node in edit mode and then replace the dealer id with the copied id from the excel sheet and save it. \n\n • Next Double click and open WE node in edit mode and then replace the dealer id with the copied id from the excel sheet and replace the postal code from ZB and save it \n\n • Next open the node that is ending with 008 and change the ORGID to 1670 and save it. \n\n • Next copy the iDOC number and go to a new window using transaction id /obd87. Paste the iDoc number and then click on the process button Picture 979118711, Picture. \n\n • In 80% of the time the order will get processed, but in case if the order does not go through successfully then meaning it's an item that is not allowed to ship into Canada. \n\n • In case if the row item turns red color, it still indicates there is some issue. The order needs to be cancelled to proceed. \n\n • Next open an incident in the IFS portal for this order to be cancelled.  https://harley.saas.axiossystems.com/assystnet/application.jsp#serviceOfferings/285 \n\n • Summary: Canadian order needs to be cancelled \n\n • Order #: Copy the order number from the node ending with 001 and paste it in the ticket \n\n • Description: Order XXXXXXX needs to be cancelled as item is not defined for Canada. Please cancel. \n\n • Until it is cancelled by the support team and the ticket is closed this order cannot be archived in SAP. \n\n • We will get a notification email if the order is cancelled and ticket is closed, however the status can also be checked from https://backoffice.cy5s8yz-harleydav1-p1-public.model-t.cc.commerce.ondemand.com/backoffice/ \n\n • Get the order number from 001. From the order menu paste the order number in the text box and search for the order number to pull up.  \n\n • If you double click on the order, there will be a bold description available which shows the status on the right. If the status is cancelled, then we are all good. Otherwise wait until it gets cancelled. \n\n • Once it is cancelled, we can archive it. \n\n • The transaction code to archive an order is /ozbc01. Paste the iDOC untick the Test checkbox number and then click process button to archive. ",
  },
  {
    id: "7",
    title:
      "Material XXXXX-XXXX is not defined for sales org. XXXX,distr.chan.10, language EN",
    description:
      "Material XXXXX-XXXX is not defined for sales org. XXXX,distr.chan.10, language EN",
    solution:
      "• When you see this kind of error in SAP. Copy the list from SAP and paste it in a blank excel sheet. \n\n • This is how the error looks after pasting. Example: Material 99074-25VX is not defined for sales org.1670, distr.chan.10, language ENCopy these numbers alone from the list 99074-25VX that has these errors \n\n • Make sure there are no duplicates. \n\n • Copy these numbers and send them to Katherine Davis & Eric in the Harley Davidson team group. \n\n • Mention, I have a few items that are to be extended and priced for Canada. \n\n • Once she confirms in the same group that she is done, copy the iDoc numbers of these orders and go to /bd87 transaction page and then reprocess it. ",
  },
  {
    id: "8",
    title: "Sold to party XXXXX not maintained for sales area XXXX XX XX. ",
    description:
      "Sold to party XXXXX not maintained for sales area XXXX XX XX. ",
    solution:
      "• Open data records, click on ZH and check the dealer number. Since its a 5-digit number we can understand it is a CA dealership order \n\n • Open ZB and check if it has CA region related information. \n\n • Similarly check ZF, RG, AG, RE and 008 ending node. \n\n • If the ORG ID in 008 ending node is not correct (i.e, for CA dealership order ORGID should be 1670) we have to change that to 1670 and save the order. \n\n • Copy the Idoc and process the saved order in /obd87. ",
  },
];

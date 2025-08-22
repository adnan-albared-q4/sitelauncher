# Site Launcher Automation Workflow - Current Manual Process Overview

## Project Scope
This document outlines the current manual site migration process and how it will be automated using the Site Launcher tool. Each step includes automation notes and estimated effort for timeline planning.

## Prelaunch Process

### 1. Level Access: Accessibility Scan
**Current Manual Process**: Run accessibility scan on the site
**Automation Approach**: Tool opens level access and auto runs scan under user supervision
**Effort Estimate**:  24 hours
**Notes**: Need site URL and other login and scan info

---

### 2. Website Tags Review
**Current Manual Process**: 
- Review Company Name and Short Name
- Review Meta Tags  
- Review Site JS Tags
- Review Site Link Tags

**Automation Approach**: Tool opens both old and new sites' CMS pages and compares values side-by-side
**Effort Estimate**: 6 hours
**Notes**: Need CMS login credentials for both sites, specific page URLs for tag management

---

### 3. Content and Indices
**Current Manual Process**:
- Check SEC Filings, Stock if they are using correct information on both Lookup list and Evergreen module - 3h
- Check if CIK and Stock indices is needed on website if not hide the page - 3h
- Compare In-Progress Content - 6h
  - Placeholder content should also be added
  - New in progress content should also be added
  - Earnings Related content on preview should also be added
- Index Website Content - 6

**Automation Approach**: Tool opens both sites' CMS pages, compares values, and carries out actions like indexing. Missing content will be flagged for user to add user other tools
**Effort Estimate**: 18 hours total
**Notes**: Need CMS access, specific page URLs, understanding of indexing process

---

### 4. Email Alerts Review and Check
**Current Manual Process**:
- ReplyTo email: System > Site List > Public Site (pencil icon) > CTRL + F "ReplyTo"
- System Messages email: Email > System Messages > Activation Email and Unsubscribe Message (pencil icon)
- Information Request Form: Pages > Resources > Information Request page (pencil icon) > Under Modules click Form Request (pencil icon) > Properties drop down > ToEmail

**Automation Approach**: Tool navigates to specific CMS pages and extracts email configuration for comparison
**Effort Estimate**: 14 hours
**Notes**: Need CMS navigation paths, form field identification

---

### 5. Subscription Check
**Current Manual Process**: 
- Change Subscription: Site Maintenance -> WebSaaS - Product Tier, choose in dropdown the subscription listed for that client
- User List:
    - Go into Q4 Platform
    - Search for the Organization Name of the client we are launching
    - Click on “Users”
    - Grab the email of all the Users
    - In the CMS create a user for each of these users under System > User List, with these credentials (example):
        Email: christy.patterson@heritagebanknw.com
        User: christy.patterson@heritagebanknw.com
        Pass: heritagebanknw2025#
    - Add this permissions:
        Client Previewer
        Client Publisher
        System Guest
    - Give access to the Public Site

**Automation Approach**: Tool navigates to subscription page and selects correct product tier
**Effort Estimate**: 12 hours
**Notes**: Need to know which product tier client subscribed to, CMS navigation path

---

## Launch Process

### 6. Client DNS Preparation
**Current Manual Process**: Client must be ready on Launch Day to perform the CNAME change and lower TTL at specified time
**Automation Approach**: Tool asks user to confirm DNS changes are complete before proceeding
**Effort Estimate**: 2 hours
**Notes**: Human confirmation step

---

### 7. New Website Launch Tasks
**Current Manual Process**:
- Review DNS statement and search URL using: https://www.whatsmydns.net/
- Domain List Change
- Host Names & SSL change
- Password Removal & Robot.txt removal
- Mark the Website as Go Live in Site Maintenance
- Invalidate Cache
- Activate Email Alerts & End of Day Stock Quote
- Turn off email alerts for Stock, SEC Filings if no integration

**Automation Approach**: Tool navigates through CMS pages and performs each action systematically
**Effort Estimate**: 18 hours
**Notes**: Need error handling for critical changes

---

### 8. Old Website Shutdown Tasks
**Current Manual Process**:
- Remove Domain
- Remove Host Name & SSL
- Add Password
- Turn Off Email Alerts & End of Day Stock Quote
- Press Release
- System > News Profile Filter List
- Turn off old CMS and make new "Active"
- Update Press Release Approval to "False"
- System > Site List > Automatic Publish > Update to inactive > Save > Publish

**Automation Approach**: Tool navigates through CMS and performs shutdown actions in sequence
**Effort Estimate**: 16 hours
**Notes**: Sequencing to avoid breaking site during transition

---

### 9. Google Search Console Setup
**Current Manual Process**:
- Platform Setup
- Entitlement Setup

**Automation Approach**: Tool navigates to Google Search Console and sets up platform entitlements
**Effort Estimate**: 19 hours
**Notes**: Need Google account access, understanding of entitlement setup process

---

## Effort Summary Table

### Prelaunch Process
| Step | Effort (Hours) |
|------|----------------|
| Accessibility Scan | 19-29 |
| Website Tags Review | 5-7 |
| Content & Indices | 14-22 |
| Email Alerts Check | 11-17 |
| Subscription Check | 10-14 |
| **Prelaunch Total** | **59-89** |

### Launch Process
| Step | Effort (Hours) |
|------|----------------|
| Client DNS Prep | 2 |
| New Site Launch | 14-22 |
| Old Site Shutdown | 14-22 |
| Google Console Setup | 15-23 |
| **Launch Total** | **45-69** |

**Total Estimated Effort: 104-158 hours**

## Automation Approach Summary

The tool will:
1. **Open browser instances** for both old and new sites
2. **Navigate to specific CMS pages** using provided URLs
3. **Compare values side-by-side** for verification tasks
4. **Perform actions systematically** for configuration changes
5. **Handle errors gracefully** with rollback options
6. **Require human approval** for critical changes
7. **Document all actions** with screenshots and logs

## Next Steps for Detailed Planning

1. **Gather CMS Documentation** - Understand specific workflows for each CMS
2. **Map Navigation Paths** - Document exact steps to reach each page/function
3. **Identify Critical Actions** - Determine which changes need human approval
4. **Test Automation Scenarios** - Validate approach with sample workflows
5. **Refine Effort Estimates** - Adjust based on actual CMS complexity



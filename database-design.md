# Site Launcher Database Design Document

## Overview
This document outlines the database design for the Site Launcher automation tool, which manages site migration workflows between old and new instances. The database will store user data, workflow configurations, automation results, and audit trails.

## Database Technology
- **Database**: SQLite (file-based, no server setup required)
- **File Location**: `/data/sitelauncher.db`
- **Backup Strategy**: Daily automated backups with 7-day retention

---

## Database Schema

### 1. Users Table
**Purpose**: Store user authentication and profile information

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'viewer') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

**Fields**:
- `id`: Unique user identifier
- `email`: User's email address (unique)
- `username`: Login username (unique)
- `password_hash`: Encrypted password
- `role`: User permission level
- `created_at`: Account creation timestamp
- `last_login`: Last login timestamp
- `is_active`: Account status

---

### 2. Organizations Table
**Purpose**: Store client organization information

```sql
CREATE TABLE organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    industry VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `id`: Unique organization identifier
- `name`: Full organization name
- `short_name`: Abbreviated name
- `industry`: Business industry
- `contact_email`: Primary contact email
- `contact_phone`: Primary contact phone
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

---

### 3. Sites Table
**Purpose**: Store old and new site information for each organization

```sql
CREATE TABLE sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL,
    site_type ENUM('old', 'new') NOT NULL,
    url VARCHAR(500) NOT NULL,
    cms_type VARCHAR(100),
    cms_version VARCHAR(50),
    admin_url VARCHAR(500),
    admin_username VARCHAR(100),
    admin_password_encrypted TEXT,
    ssl_enabled BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'migrating') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
```

**Fields**:
- `id`: Unique site identifier
- `organization_id`: Reference to organization
- `site_type`: Whether this is old or new site
- `url`: Site URL
- `cms_type`: Content management system type
- `cms_version`: CMS version number
- `admin_url`: Admin panel URL
- `admin_username`: Admin username
- `admin_password_encrypted`: Encrypted admin password
- `ssl_enabled`: SSL certificate status
- `status`: Current site status
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

---

### 4. Workflows Table
**Purpose**: Store workflow definitions and configurations

```sql
CREATE TABLE workflows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workflow_type ENUM('site_migration', 'content_update', 'accessibility_scan') DEFAULT 'site_migration',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    target_completion_date DATE,
    status ENUM('draft', 'active', 'paused', 'completed', 'failed') DEFAULT 'draft',
    created_by INTEGER NOT NULL,
    assigned_to INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);
```

**Fields**:
- `id`: Unique workflow identifier
- `organization_id`: Reference to organization
- `name`: Workflow name
- `description`: Workflow description
- `workflow_type`: Type of automation workflow
- `priority`: Workflow priority level
- `target_completion_date`: Target completion date
- `status`: Current workflow status
- `created_by`: User who created the workflow
- `assigned_to`: User assigned to the workflow
- `created_at`: Workflow creation timestamp
- `updated_at`: Last update timestamp

---

### 5. WorkflowRuns Table
**Purpose**: Store individual execution instances of workflows

```sql
CREATE TABLE workflow_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_id INTEGER NOT NULL,
    run_number INTEGER NOT NULL,
    status ENUM('running', 'paused', 'completed', 'failed', 'cancelled') DEFAULT 'running',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    total_steps INTEGER DEFAULT 0,
    completed_steps INTEGER DEFAULT 0,
    current_step INTEGER DEFAULT 0,
    error_message TEXT,
    created_by INTEGER NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

**Fields**:
- `id`: Unique run identifier
- `workflow_id`: Reference to workflow
- `run_number`: Sequential run number for this workflow
- `status`: Current run status
- `started_at`: Run start timestamp
- `completed_at`: Run completion timestamp
- `total_steps`: Total number of steps in workflow
- `completed_steps`: Number of completed steps
- `current_step`: Currently executing step
- `error_message`: Error details if failed
- `created_by`: User who initiated the run

---

### 6. Steps Table
**Purpose**: Store individual automation steps within workflows

```sql
CREATE TABLE steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    step_type ENUM('automation', 'manual', 'verification', 'approval') NOT NULL,
    automation_script TEXT,
    required_data JSON,
    estimated_duration INTEGER, -- in minutes
    is_required BOOLEAN DEFAULT TRUE,
    can_skip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id)
);
```

**Fields**:
- `id`: Unique step identifier
- `workflow_id`: Reference to workflow
- `step_number`: Sequential step number
- `name`: Step name
- `description`: Step description
- `step_type`: Type of step
- `automation_script`: Playwright automation code
- `required_data`: JSON data needed for step execution
- `estimated_duration`: Estimated time to complete
- `is_required`: Whether step must be completed
- `can_skip`: Whether step can be skipped

---

### 7. StepExecutions Table
**Purpose**: Store execution results for individual steps

```sql
CREATE TABLE step_executions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_run_id INTEGER NOT NULL,
    step_id INTEGER NOT NULL,
    status ENUM('pending', 'running', 'completed', 'failed', 'skipped') DEFAULT 'pending',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    duration INTEGER, -- in seconds
    result_data JSON,
    error_message TEXT,
    screenshot_path VARCHAR(500),
    log_output TEXT,
    executed_by INTEGER,
    FOREIGN KEY (workflow_run_id) REFERENCES workflow_runs(id),
    FOREIGN KEY (step_id) REFERENCES steps(id),
    FOREIGN KEY (executed_by) REFERENCES users(id)
);
```

**Fields**:
- `id`: Unique execution identifier
- `workflow_run_id`: Reference to workflow run
- `step_id`: Reference to step
- `status`: Execution status
- `started_at`: Execution start timestamp
- `completed_at`: Execution completion timestamp
- `duration`: Actual execution time
- `result_data`: JSON data from step execution
- `error_message`: Error details if failed
- `screenshot_path`: Path to captured screenshot
- `log_output`: Execution log output
- `executed_by`: User who executed the step

---

### 8. Screenshots Table
**Purpose**: Store screenshots captured during automation

```sql
CREATE TABLE screenshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    step_execution_id INTEGER NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER, -- in bytes
    mime_type VARCHAR(100) DEFAULT 'image/png',
    description TEXT,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (step_execution_id) REFERENCES step_executions(id)
);
```

**Fields**:
- `id`: Unique screenshot identifier
- `step_execution_id`: Reference to step execution
- `filename`: Screenshot filename
- `file_path`: Full file path
- `file_size`: File size in bytes
- `mime_type`: Image file type
- `description`: Screenshot description
- `captured_at`: Capture timestamp

---

### 9. Credentials Table
**Purpose**: Store encrypted credentials for external services

```sql
CREATE TABLE credentials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL,
    service_name VARCHAR(100) NOT NULL, -- 'google_console', 'level_access', etc.
    credential_type ENUM('api_key', 'username_password', 'oauth_token') NOT NULL,
    encrypted_data TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
```

**Fields**:
- `id`: Unique credential identifier
- `organization_id`: Reference to organization
- `service_name`: External service name
- `credential_type`: Type of credential
- `encrypted_data`: Encrypted credential data
- `is_active`: Whether credential is active
- `expires_at`: Credential expiration date
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

---

### 10. AuditLog Table
**Purpose**: Store audit trail for all system activities

```sql
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50), -- 'workflow', 'step', 'credential', etc.
    entity_id INTEGER,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Fields**:
- `id`: Unique log entry identifier
- `user_id`: User who performed the action
- `action`: Action performed
- `entity_type`: Type of entity affected
- `entity_id`: ID of affected entity
- `old_values`: Previous values (JSON)
- `new_values`: New values (JSON)
- `ip_address`: User's IP address
- `user_agent`: User's browser/agent
- `created_at`: Action timestamp

---

## Database Relationships

### Primary Relationships
```
Organizations (1) ←→ (Many) Sites
Organizations (1) ←→ (Many) Workflows
Workflows (1) ←→ (Many) WorkflowRuns
Workflows (1) ←→ (Many) Steps
WorkflowRuns (1) ←→ (Many) StepExecutions
Steps (1) ←→ (Many) StepExecutions
StepExecutions (1) ←→ (Many) Screenshots
Organizations (1) ←→ (Many) Credentials
Users (1) ←→ (Many) Workflows (created_by)
Users (1) ←→ (Many) WorkflowRuns (created_by)
Users (1) ←→ (Many) StepExecutions (executed_by)
Users (1) ←→ (Many) AuditLog
```

### Foreign Key Constraints
- All foreign keys enforce referential integrity
- Cascade deletes for dependent records
- Indexes on frequently queried foreign keys

---

## Data Flow

### 1. Workflow Creation
1. User creates organization record
2. User adds old and new site records
3. User creates workflow with step definitions
4. System stores workflow configuration

### 2. Workflow Execution
1. User initiates workflow run
2. System creates WorkflowRun record
3. System executes steps sequentially
4. Each step execution is recorded
5. Screenshots captured and stored
6. Progress updated in real-time

### 3. Data Retrieval
1. Dashboard queries active workflows
2. Progress tracking uses WorkflowRuns
3. Screenshots linked to step executions
4. Audit trail provides complete history

---

## Security Considerations

### Data Encryption
- **Passwords**: Bcrypt hashing with salt
- **API Keys**: AES-256 encryption
- **Sensitive Data**: Encrypted at rest

### Access Control
- **User Roles**: Admin, User, Viewer permissions
- **Organization Isolation**: Users can only access their organization's data
- **Audit Logging**: All actions logged with user attribution

### Backup Security
- **Encrypted Backups**: Database backups encrypted
- **Access Control**: Backup files restricted access
- **Retention Policy**: 7-day backup retention

---

## Performance Considerations

### Indexing Strategy
```sql
-- Primary indexes for performance
CREATE INDEX idx_workflows_organization ON workflows(organization_id);
CREATE INDEX idx_workflow_runs_workflow ON workflow_runs(workflow_id);
CREATE INDEX idx_step_executions_run ON step_executions(workflow_run_id);
CREATE INDEX idx_screenshots_execution ON screenshots(step_execution_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);
```

### Query Optimization
- **Eager Loading**: Load related data in single queries
- **Pagination**: Large result sets paginated
- **Caching**: Frequently accessed data cached

---

## Migration Strategy

### Version Control
- **Schema Versioning**: Track database schema changes
- **Migration Scripts**: Automated schema updates
- **Rollback Support**: Ability to revert schema changes

### Data Migration
- **Backup Before Changes**: Always backup before schema changes
- **Incremental Updates**: Apply changes incrementally
- **Validation**: Verify data integrity after changes

---

## Monitoring & Maintenance

### Health Checks
- **Database Size**: Monitor database file size
- **Query Performance**: Track slow queries
- **Connection Count**: Monitor active connections

### Maintenance Tasks
- **Daily Backups**: Automated backup process
- **Weekly Vacuum**: SQLite optimization
- **Monthly Cleanup**: Remove old audit logs and screenshots

---

## Future Considerations

### Scalability
- **Database Sharding**: If organization count grows significantly
- **Read Replicas**: For high-read workloads
- **Connection Pooling**: For concurrent user access

### Additional Features
- **Workflow Templates**: Reusable workflow definitions
- **API Integration**: External service integrations
- **Advanced Reporting**: Analytics and insights
- **Multi-tenancy**: Support for multiple organizations per user 
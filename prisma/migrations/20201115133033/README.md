# Migration `20201115133033`

This migration has been generated by Alexander Swed at 11/15/2020, 2:30:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "WorkspaceProjectSetup" DROP CONSTRAINT "WorkspaceProjectSetup_workspaceProjectId_fkey"

ALTER TABLE "WorkspaceProjectSetup" DROP COLUMN "workspaceProjectId",
ADD COLUMN     "project_id" INTEGER NOT NULL

ALTER TABLE "WorkspaceProjectSetup" ADD FOREIGN KEY("project_id")REFERENCES "WorkspaceProject"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201114190609..20201115133033
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -81,10 +81,12 @@
 }
 model WorkspaceProjectSetup {
-  id            Int      @id @default(autoincrement())
-  key           String   @default(cuid())
+  id            Int                @id @default(autoincrement())
+  key           String             @default(cuid())
+  projectId     Int                @map(name: "project_id")
+  project       WorkspaceProject   @relation(fields: [projectId], references: [id])
   lastUsed      DateTime?
 }
```



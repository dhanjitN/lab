import { db, Report } from "@/dexie/dexie.db";

// Add a single report
export const addReport = async (reportData: Report) => {
    try {
        await db.open();
        const id = await db.reports.add(reportData);
        return id;
    }
    catch (error: any) {
        if (error.name === "ConstraintError") {
            console.error("Duplicate key detected:", reportData);
        }
    }
}

// Bulk add reports
export const bulkReports = async (reports: Report[]) => {
    try {
        await db.open();
        await db.reports.clear();
        await db.reports.bulkPut(reports);
        return true;
    } catch (error) {
        console.error('Error adding reports:', error);
        return false;
    }
}

// Get all reports
export const getReports = async () => {
    await db.open();
    return db.reports.reverse().toArray();
}

export const getReportLength = async () => {
    try {
        const count = await db.reports.count();
        return count;
    } catch (error) {
        console.error("Failed to get report count:", error);
        return 0;
    }
};


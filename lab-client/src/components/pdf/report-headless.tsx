"use client"
import React from "react"
import { Page, Document, Text, View, StyleSheet } from "@react-pdf/renderer"
import { useReportStore } from "@/lib/hooks/use-report-store"
import { ReportHead } from "./report-head"
import { ReportBody } from "./report-body"


export const ReportPdf = () => {
    const { pages, reportDetails, patientDetails } = useReportStore()
    return (
        <Document   title={`${patientDetails.name}'s Report`}>

            {pages.map((page) => {
                return (
                    <Page key={page.id} size={"A4"} >
                        <View>
                            <ReportHead />
                            <ReportBody page={page} />
                        </View>
                    </Page>
                )
            })}
        </Document>
    )
}
"use client";
import { PageData, useReportStore } from "@/lib/hooks/use-report-store"
import { View, Text, StyleSheet } from "@react-pdf/renderer"
import { CollectionPdf } from "./collection"
export const ReportBody = ({ page }: { page: PageData }) => {
    const { pages } = useReportStore()

    const styles = StyleSheet.create({
        main: {
            fontSize: '12',
            marginTop: '15',
            paddingLeft: '30',
            paddingRight: '30',
        },
        topHeading: {
            borderTop: 1,
            borderBottom: 1,
            flexDirection: 'row',
            width: '100%',
        },
        mainReport: {
            paddingTop: '6',
            fontSize: '12',
            fontWeight: '500'

        }
    })
    return (
        <View style={styles.main}>
            {/* Top Part  */}
            <View style={styles.topHeading}>
                <Text style={{ width: '30%', textAlign: 'left' }}>INVESTIGATIONS</Text>
                <Text style={{ width: '20%', textAlign: 'left' }}>VALUE</Text>
                <Text style={{ width: '25%', textAlign: 'left' }}>UNIT</Text>
                <Text style={{ width: '25%', textAlign: 'left' }}>REF. RANGE</Text>
            </View>

            {/* Main Report Details  */}
            <View style={styles.mainReport}>
                <View>
                    <Text style={{ textDecoration: "underline" }}>
                        {page.categoryName.toLocaleUpperCase() || "Category Name"}
                    </Text>

                    {page.collections.map((collection) => {
                        return (
                            <CollectionPdf collection={collection} key={collection.id} />
                        )
                    })}
                </View>
            </View>

        </View>
    )
}
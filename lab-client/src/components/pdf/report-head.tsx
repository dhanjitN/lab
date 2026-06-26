"use client";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { View, Text, StyleSheet, Font } from "@react-pdf/renderer";

// Font Register

Font.register({
  family: "DejaVuSans",
  src: "/DejaVuSans.ttf",
});

const styles = StyleSheet.create({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 3,
    alignSelf: "flex-start",
    fontFamily: "Courier",
  },
  full: {
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginTop: "100",
    marginLeft: "30",
    marginRight: "30",
  },
  topBorder: {
    height: "1",
    borderTop: "2",
    borderBottom: "2",
  },
});

export const ReportHead = () => {
  const { reportDetails, patientDetails } = useReportStore();
  return (
    // Report Details
    <View style={styles.full}>
      <View style={styles.topBorder}></View>
      <View style={styles.head}>
        <Text>PATIENT NAME : {patientDetails.name}</Text>
        <Text>REF. NO : {reportDetails.refNo}</Text>
      </View>
      <View style={styles.head}>
        <Text>
          AGE/SEX : {patientDetails.age} YEARS / {patientDetails.sex}
        </Text>
        <Text>TEST DATE : {reportDetails.testDate.toLocaleDateString()}</Text>
      </View>
      <View style={styles.head}>
        <Text>REF. BY DR. : {reportDetails.refByDoc}</Text>
        <Text>REP. DATE : {reportDetails.reportDate.toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

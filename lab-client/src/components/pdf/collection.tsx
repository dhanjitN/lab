"use client";
import { ReportTestCollection, Test } from "@/lib/hooks/use-report-store";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

export const CollectionPdf = ({
  collection,
}: {
  collection: ReportTestCollection;
}) => {
  const styles = StyleSheet.create({
    main: {
      paddingTop: 10,
    },
    collectionText: {
      fontSize: 10,
      fontWeight: "500",
      marginBottom: 6,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    tableRow: {
      flexDirection: "row",
      fontSize: 10,
      borderBottom: "0.5px solid #e0e0e0",
      paddingVertical: 3,
    },
    tableHeader: {
      flexDirection: "row",
      borderBottom: "1px solid black",
      paddingVertical: 4,
      backgroundColor: "#f0f0f0",
    },
    column: {
      fontSize: 8,
      fontWeight: 300,
      paddingHorizontal: 4,
    },
    colName: {
      width: "30%",
    },
    colValue: {
      width: "20%",
    },
    colUnit: {
      width: "25%",
    },
    colRange: {
      width: "25%",
    },
  });

  return (
    <View style={styles.main}>
      <Text style={styles.collectionText}>{collection.collectionName}</Text>

      <View style={styles.table}>
        {/* Table Rows */}
        {collection.tests.map((test: Test) => (
          <View style={styles.tableRow} key={test.id}>
            <Text style={[styles.column, styles.colName]}>{test.testName}</Text>
            <Text style={[styles.column, styles.colValue]}>
              {(() => {
                const [min, max] = test.refRange.split(" - ").map(parseFloat);
                const value = parseFloat(test.value);

                if (value > max) {
                  return (
                    <Text>
                      <Text style={{ fontFamily: "DejaVuSans" }}>↑</Text>
                      <Text style={{ fontWeight: "bold" }}>{test.value}</Text>
                    </Text>
                  );
                }

                if (value < min) {
                  return (
                    <Text>
                      <Text style={{ fontFamily: "DejaVuSans" }}>↓</Text>
                      <Text style={{ fontWeight: "bold" }}>{test.value}</Text>
                    </Text>
                  );
                }

                return (
                  <Text>
                    <Text style={{ fontFamily: "DejaVuSans", color: "white" }}>
                      ↓
                    </Text>
                    <Text>{test.value}</Text>
                  </Text>
                );
              })()}
            </Text>
            <Text style={[styles.column, styles.colUnit]}>{test.unit}</Text>
            <Text style={[styles.column, styles.colRange]}>
              {test.refRange}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

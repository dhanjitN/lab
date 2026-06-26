import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircleIcon, Trash } from "lucide-react";
import { ServerTest, Test, useReportStore } from "@/lib/hooks/use-report-store";
import { SingleTest } from "./single-test-row";
import { v4 } from "uuid";

export function TestTable({
  tests = [],
  collectionId,
  pageId,
}: {
  tests: Test[];
  collectionId: string;
  pageId: string;
}) {
  const { addTestToCollection } = useReportStore();
  const emptyTest: Test = {
    id: v4(),
    testName: "",
    unit: "",
    refRange: "",
    value: "",
  };
  return (
    <Table className="border p-3 rounded-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Test Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>ref. Range </TableHead>
          <TableHead>
            {/* <Button
              className="self-end"
              onClick={() => {
                addTestToCollection(pageId, collectionId, emptyTest)
              }}
            >
              Test <PlusCircleIcon />
            </Button> */}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tests.length > 0 &&
          tests.map((test) => {
            return (
              <SingleTest
                selectedTest={test}
                key={test.id}
                collectionId={collectionId}
                pageId={pageId}
              />
            );
          })}
      </TableBody>
    </Table>
  );
}

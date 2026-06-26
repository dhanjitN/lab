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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Test, useReportStore } from "@/lib/hooks/use-report-store";
export const SingleTest = ({
  selectedTest,
  pageId,
  collectionId,
}: {
  selectedTest: Test;
  pageId: string;
  collectionId: string;
}) => {
  const { removeTestFromCollection, updateTestInCollection } = useReportStore();
  const [test, setTest] = useState<Test>({
    id: selectedTest.id,
    testName: selectedTest.testName,
    value: selectedTest.value,
    unit: selectedTest.unit,
    refRange: `${selectedTest.refRange}`,
  });

  useEffect(() => {
    updateTestInCollection(pageId, collectionId, test);
  }, [test]);

  return (
    <TableRow key={test.id} className="w-md">
      <TableCell className="font-medium justify-center w-auto items-center">
        <Input
          value={test.testName}
          onChange={(e) =>
            setTest((prevTest) => ({
              ...prevTest,
              testName: e.target.value,
            }))
          }
          disabled={true}
        ></Input>
      </TableCell>
      <TableCell>
        <Input
          value={test.value}
          onChange={(e) =>
            setTest((prevTest) => ({
              ...prevTest,
              value: e.target.value,
            }))
          }
        ></Input>
      </TableCell>
      <TableCell>
        <Input
          value={test.unit}
          onChange={(e) =>
            setTest((prevTest) => ({
              ...prevTest,
              unit: e.target.value,
            }))
          }
          disabled={true}
        ></Input>
      </TableCell>
      <TableCell>
        <Input
          value={test.refRange}
          onChange={(e) =>
            setTest((prevTest) => ({
              ...prevTest,
              refRange: e.target.value,
            }))
          }
          disabled={true}
          className="opacity-100"
        ></Input>
      </TableCell>

      <TableCell>
        <Button
          onClick={() => {
            removeTestFromCollection(pageId, collectionId, test.id);
          }}
          variant={"ghost"}
          className="hover:cursor-pointer p-0"
        >
          <Trash />
        </Button>
      </TableCell>
    </TableRow>
  );
};

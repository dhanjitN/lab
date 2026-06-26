import {
  Form,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { CreatableCombobox } from "@/components/selfMade/creatable-combobox";
import { Button } from "@/components/ui/button";
import { MinusCircleIcon } from "lucide-react";
import z from "zod";
import { TestTable } from "./test-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReportTestCollection,
  ServerTest,
  Test,
  TestCollection,
  useReportStore,
} from "@/lib/hooks/use-report-store";
import { useEffect, useState } from "react";

const formSchema = z.object({
  collection: z.string(),
});

export const NewCollection = ({
  pageId,
  collection = {
    id: "",
    collectionName: "",
    tests: [],
  },
  collections,
  collectionNames,
}: {
  pageId: string;
  collection: ReportTestCollection;
  collections: ReportTestCollection[];
  collectionNames: string[];
}) => {
  const { removeCollectionFromCategory, updateCollectionInCategory, testData, pages } =
    useReportStore();
  const [tests, setTests] = useState<Test[]>(collection?.tests);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collection: collection.collectionName,
    },
  });

  const selectedCollection = form.watch("collection");

  useEffect(() => {
    const newCollection = collections.find((collection) => {
      return collection.collectionName === selectedCollection;
    }) || {
      id: "",
      collectionName: "",
      tests: [],
    };
    const tests: Test[] = newCollection?.tests;
    setTests(tests);
  }, [selectedCollection, collections, testData, pages]);

  const handleCollectionChange = (val: string) => {
    form.setValue("collection", val);
    console.log("Value", val);
    updateCollectionInCategory(pageId, collection.id, val);
  };

  useEffect(() => {
    const newCollection = collections.find(
      (collection) => collection.collectionName === selectedCollection
    );
    const tests = newCollection ? newCollection.tests : [];
    setTests(tests);
  }, [selectedCollection, collections, testData, pages]);
  return (
    <div key={collection.id}>
      <Form {...form}>
        <form className="flex justify-center md:py-2 flex-col items-center ">
          <div className="self-start flex justify-between  items-center md:w-full md:pt-1">
            {/* Collection   */}
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Collection: </FormLabel>
                  <FormControl>
                    <CreatableCombobox
                      value={field.value}
                      onChange={handleCollectionChange}
                      options={collectionNames}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="self-start ">
              <Button onClick={(e) => {
                e.preventDefault();
                removeCollectionFromCategory(pageId, collection.id)
              }} className="hover:cursor-pointer" variant={"destructive"}>
                collection <MinusCircleIcon />
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div>
        <div className="flex flex-col items-center justify-center gap-2 md:w-full">
          <div className="flex items-center md:gap-3  justify-around">
            {/* <div>tests {JSON.stringify(collection.tests)}</div> */}

            <TestTable
              collectionId={collection.id}
              pageId={pageId}
              tests={tests}
            // onTestChange={onChangeTest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

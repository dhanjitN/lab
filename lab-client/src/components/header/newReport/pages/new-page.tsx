"use client";
import {
  PageData,
  ReportTestCollection,
  ServerTest,
  TestCategory,
  TestCollection,
  useReportStore,
} from "@/lib/hooks/use-report-store";
import { Button } from "@/components/ui/button";
import {
  MinusCircle,
  MinusCircleIcon,
  Plus,
  PlusCircleIcon,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TestTable } from "./test-table";
import { CreatableCombobox } from "@/components/selfMade/creatable-combobox";
import { useEffect, useMemo, useState } from "react";
import { NewCollection } from "./new-collection";
import { v4 } from "uuid";

const formSchema = z.object({
  category: z.string(),
  collection: z.string(),
  tests: z.array(
    z.object({
      testName: z.string(),
      value: z.string(),
      unit: z.string(),
      refRange: z.string().optional(),
      refPostiveNegative: z.string().optional(),
    })
  ),
});

export default function NewPage({ page }: { page: PageData }) {
  const {
    addNewCollectionToCategory,
    addCollectionToCategory,
    getCollectionsFromCategory,
    removeCollectionsFromPage,
    updateCateogoryNameInPage,
    removePage,
    testData,
    pages,
  } = useReportStore();
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [collections, setCollections] = useState<TestCollection[]>([]);
  const [reportCollections, setReportCollections] = useState<
    ReportTestCollection[]
  >([]);
  const [collectionNames, setCollectionNames] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      collection: "",
      tests: [
        {
          testName: "",
          value: "",
          unit: "",
          refRange: "",
          refPostiveNegative: "",
        },
      ],
    },
  });

  const selectedCategory = form.watch("category");

  //  Category Names
  useEffect(() => {
    if (testData?.testData) {
      const categoryNames = testData.testData.map((category) => {
        return category.testCategoryName;
      });
      setCategoryNames(categoryNames);
    }
  }, [testData]);

  // Select categories
  useEffect(() => {
    if (selectedCategory && testData.testData.length > 0) {
      const collections = testData.testData.find(
        (category) => category.testCategoryName === selectedCategory
      )?.testCollections;
      setCollections(collections || []);
    }
  }, [selectedCategory]);

  // Collection Names
  useEffect(() => {
    if (collections) {
      const collectionNames =
        collections.map((collection) => {
          return collection.testCollectionName;
        }) || [];
      setCollectionNames(collectionNames);
    }
  }, [collections]);

  const addCollection = () => {
    const newCollection: ReportTestCollection = {
      id: v4(),
      collectionName: "",
      tests: [],
    };
    addNewCollectionToCategory(page.id, newCollection.id);
    // const updatedCollections = [...collections, newCollection];
  };

  const [localCategory, setLocalCategory] = useState<string>("");
  const handleCategoryChange = (val: string) => {
    form.setValue("category", val);
    updateCateogoryNameInPage(page.id, val);
    setLocalCategory(val);
  };

  useEffect(() => {
    if (!localCategory || !page.id) return;

    const matched = testData.testData.find(
      (cat) => cat.testCategoryName === localCategory
    );

    if (matched) {
      setCollections(matched.testCollections || []);
      setCollectionNames(
        (matched.testCollections || []).map((c) => c.testCollectionName)
      );

      // Wait for store sync, then get from reportStore
      setTimeout(() => {
        const fromStore = getCollectionsFromCategory(page.id);
        setReportCollections(fromStore);
      }, 1); // Force it to happen after current tick
    }
  }, [localCategory, page.id, testData, pages]);

  useEffect(() => {
    if (!page?.id) return;

    // Clear collections first
    removeCollectionsFromPage(page.id);

    // Then re-add from collectionNames
    collections.forEach((collection) => {
      addCollectionToCategory(page.id, collection);
    });
  }, [categoryNames, collections]);

  useEffect(() => {
    console.log("Report Collections", reportCollections);
  }, [reportCollections]);

  return (
    <div
      key={page.id}
      className=" border-chart-3 border-t md:mt-3 md:pt-3 pt-1 mt-1 bg-secondary "
    >
      <div className="w-full flex items-center justify-between md:px-5 md:gap-2 ">
        <div suppressHydrationWarning>
          {/* {JSON.stringify(pages)} */}
          <p className="font-semibold text md:text-xl  flex  md:block">
            Page: {page.pageNo + 1}
          </p>
        </div>
        <Form {...form}>
          <form className="flex justify-center flex-col items-center ">
            {/* Category  */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center ">
                  <FormLabel> Category:</FormLabel>
                  <FormControl>
                    <CreatableCombobox
                      value={field.value}
                      onChange={handleCategoryChange}
                      options={categoryNames}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button
          className="hover:cursor-pointer"
          variant={"destructive"}
          onClick={() => removePage(page.id)}
          disabled={pages.length <= 1}
        >
          {" "}
          page: <MinusCircleIcon />
        </Button>
      </div>

      <div className=" flex flex-col items-center  md:p-4 md:gap-3 ">
        {reportCollections.length > 0 &&
          reportCollections.map((collection: ReportTestCollection) => {
            return (
              <NewCollection
                collection={collection}
                key={collection.id}
                pageId={page.id}
                collections={reportCollections}
                collectionNames={collectionNames}
              />
            );
          })}
        <div className="self-start">
          {/* <Button
            variant={"default"}
            onClick={() => {
              addCollection();
            }}
            className="hover:cursor-pointer "
          >
            collection <PlusCircleIcon />
          </Button> */}
        </div>
      </div>
    </div>
  );
}

import { create } from "zustand";
import { v4 as uuid, validate } from "uuid";
export interface Test {
    id: string;
    testName: string;
    value: string;
    unit: string;
    refRange: string;
    // positiveNegative: string;
}
export interface PageData {
    id: string;
    pageNo: number;
    categoryName: string;
    collections: {
        id: string;
        collectionName: string;
        tests: Test[];
    }[];
}

export interface ReportTestCollection {
    id: string;
    collectionName: string;
    tests: Test[];
}


export interface ReportStore {
    labName: string;
    id: string;
    reportDetails: {
        refNo: string;
        testDate: Date;
        reportDate: Date;
        refByDoc: string;
    };
    patientDetails: {
        name: string;
        age: string;
        sex: string;
    };
    pages: PageData[];
    testData: TestData;
    searchInput: string;
    doctors: string[];


    setLabName: (labName: string) => void;
    // initial testDat values from API call
    setTestData: (data: TestData) => void;

    //Report and patient details
    updateReportDetail: (data: Partial<ReportStore["reportDetails"]>) => void;
    updatePatientDetail: (data: Partial<ReportStore["patientDetails"]>) => void;

    // Page actions
    addPage: () => void;
    removePage: (pageId: string) => void;

    // Category Actions
    getCategoryName: (pageId: string) => string;
    updateCateogoryNameInPage: (pageId: string, categoryName: string) => void;
    removeCollectionsFromPage: (pageId: string) => void;

    // Collection Actions
    addCollectionToCategory: (
        pageId: string,
        collectionData: TestCollection
    ) => void;
    addNewCollectionToCategory: (pageId: string, collectionId: string) => void;
    getCollectionsFromCategory: (pageId: string) => ReportTestCollection[];

    updateCollectionInCategory: (
        pageId: string,
        collectionId: string,
        collectionName: string
    ) => void;
    removeCollectionFromCategory: (pageId: string, collectionId: string) => void;

    // Test Actions
    addTestToCollection: (
        pageId: string,
        collectionId: string,
        test: Test
    ) => void;
    updateTestInCollection: (
        pageId: string,
        collectionId: string,
        test: Test
    ) => void;
    removeTestFromCollection: (pageId: string, collectionId: string, testId: string) => void;

    updateState: (reportDate: PageData[]) => void;

    setSearchInput: (inputText: string) => void;
    setDoctors: (doctors: string[]) => void;

}

export interface ServerTest {
    _id: string;
    testName: string;
    refRangeStart: string;
    refRangeEnd: string;
    unit: string;
    testNote: string;
    __v: number;
}

export interface TestCollection {
    _id: string;
    testCollectionName: string;
    tests: ServerTest[];
    testCollectionNote: string;
    __v: number;
}

export interface TestCategory {
    _id: string;
    testCategoryName: string;
    testCollections: TestCollection[];
    testCategoryNote: string;
    __v: number;
}

export interface TestData {
    _id: string;
    phytolabId: string;
    testData: {
        _id: string;
        testCategoryName: string;
        testCollections: {
            _id: string;
            testCollectionName: string;
            tests: ServerTest[];
            testCollectionNote: string;
            __v: number;
        }[];
        testCategoryNote: string;
        __v: number;
    }[];
    note: string;
    __v: number;
}

interface TestDataResponse {
    statusCode: number;
    data: TestData[];
    message: string;
    success: boolean;
}

const emptyPageObject: PageData = {
    id: uuid(),
    pageNo: 0,
    categoryName: "",
    collections: [
        {
            id: uuid(),
            collectionName: "",
            tests: [
                {
                    id: uuid(),
                    testName: "",
                    value: "",
                    unit: "",
                    refRange: "",
                },
            ],
        },
    ],
};

export const useReportStore = create<ReportStore>((set) => ({
    labName: "lab",
    id: uuid(),
    reportDetails: {
        refNo: "",
        testDate: new Date(),
        reportDate: new Date(),
        refByDoc: "",
    },
    patientDetails: {
        name: "",
        age: "",
        sex: "",
    },
    pages: [
        {
            id: uuid(),
            pageNo: 0,
            categoryName: "",
            collections: [
                /* {
                  id: uuid(),
                  collectionName: "",
                  tests: [
                    {
                      id: uuid(),
                      testName: "",
                      value: "",
                      unit: "",
                      refRange: "",
                      positiveNegative: "",
                    },
                  ],
                }, */
            ],
        },
    ],

    testData: {
        _id: "",
        __v: 0,
        phytolabId: "",
        testData: [],
        note: "",
    },
    searchInput: "",
    doctors: [],


    setLabName(labname) {
        set(() => ({
            labName: labname
        }))
    },
    setTestData(data) {
        set((state) => ({
            testData: data,
        }));
    },
    // Actions

    // Update Report Details !
    updateReportDetail: (reportData: Partial<ReportStore["reportDetails"]>) =>
        set((state) => ({
            reportDetails: {
                ...state.reportDetails,
                ...reportData,

            },
        })),

    // Update Patient Details
    updatePatientDetail: (patientData: Partial<ReportStore["patientDetails"]>) =>
        set((state) => ({
            patientDetails: {
                ...state.patientDetails,
                ...patientData,
            },
        })),

    // Add empty page to pages
    addPage: () =>
        set((state) => {
            const nextPageNo = state.pages.length;
            return {
                pages: [
                    ...state.pages,
                    {
                        ...emptyPageObject,
                        pageNo: nextPageNo,
                        id: uuid(),
                    },
                ],
            };
        }),

    // Remove Page with pageId from pages
    removePage: (pageId) =>
        set((state) => {
            const updatedPages = state.pages.filter((p) => p.id !== pageId);

            const renumberedPages = updatedPages.map((page, i) => ({
                ...page,
                pageNo: i,
            }));

            return { pages: renumberedPages };
        }),

    // Category Actions
    getCategoryName(pageId) {
        const state = useReportStore.getState();
        const categoryName: string =
            state.pages.find((page) => page.id === pageId)?.categoryName || "";

        return categoryName;
    },
    updateCateogoryNameInPage(pageId, categoryName) {
        set((state) => {
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;
                console.log("Match : ", pageId);

                return {
                    ...page,
                    categoryName: categoryName,
                };
            });
            return { pages: updatedPages };
        });
    },

    // Collection Actions
    addCollectionToCategory(pageId, collectionData) {
        set((state) => {
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                const newCollection: ReportTestCollection = {
                    id: uuid(),
                    collectionName: collectionData.testCollectionName,
                    tests: collectionData.tests.map((test) => {
                        return {
                            id: uuid(),
                            testName: test.testName,
                            value: "",
                            unit: test.unit,
                            refRange: `${test.refRangeStart} - ${test.refRangeEnd}  `,
                        };
                    }),
                };

                const updatedCollections = [...page.collections, newCollection];
                return {
                    ...page,
                    collections: updatedCollections,
                };
            });
            return { pages: updatedPages };
        });
    },
    getCollectionsFromCategory(pageId) {
        const state = useReportStore.getState();
        const page: PageData | undefined = state.pages.find(
            (page) => page.id === pageId
        );
        const collections: ReportTestCollection[] = page?.collections || [];
        return collections;
    },

    updateCollectionInCategory(pageId, collectionId, collectionName) {
        set((state) => {
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                const collectionToUpdate = state.testData.testData.find((category) => category.testCategoryName === page.categoryName)?.testCollections.find((collection) => collection.testCollectionName === collectionName);

                const parsedCollection: ReportTestCollection = {
                    id: collectionId,
                    collectionName: collectionToUpdate?.testCollectionName || collectionName,
                    tests: collectionToUpdate?.tests.map((test: ServerTest) => {
                        return {
                            id: uuid(),
                            testName: test.testName,
                            value: "",
                            refRange: `${test.refRangeStart} - ${test.refRangeEnd}`,
                            unit: test.unit,
                        }
                    }) || []
                }

                const updatedCollections = page.collections.map((collection) => {
                    if (collection.id !== collectionId) return collection;
                    // console.log("Collection that is ", collection);
                    // console.log("Collection to update by", collectionToUpdate);


                    return { ...parsedCollection };
                });

                console.log("updated collections ", updatedCollections);
                return {
                    ...page, // Replace the page with updated collections
                    collections: updatedCollections,
                };
            });

            return { pages: updatedPages }; // Return updated state
        });
    },

    addNewCollectionToCategory(pageId, collectionId) {
        set((state) => {
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                // Create new collection
                const newCollection = {
                    id: collectionId,
                    collectionName: "",
                    tests: [],
                };

                // Add new collection immutably
                const updatedCollections = [...page.collections, newCollection];

                // Return updated page
                return {
                    ...page,
                    collections: updatedCollections,
                };
            });

            // Return updated state
            return { pages: updatedPages };
        });
    },
    removeCollectionsFromPage(pageId) {
        set((state) => {
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                return {
                    ...page,
                    collections: [],
                };
            });
            return { pages: updatedPages };
        });
    },

    removeCollectionFromCategory(pageId, collectionId) {
        set((state) => {

            console.log(pageId, collectionId)
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                console.log("page matched", page.id === pageId);

                const updatedCollections = page.collections.filter((collection) => {
                    return collection.id !== collectionId
                })

                console.log("Updated Collections", updatedCollections)

                return {
                    ...page,
                    collections: updatedCollections,
                }
            })

            return { pages: updatedPages }
        })
    },

    // Test Actions

    addTestToCollection(pageId, collectionId, test) {
        set((state) => {
            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                const collections = page.collections.map((collection) => {
                    if (collection.id !== collectionId) return collection;

                    return {
                        ...collection,
                        tests: [
                            ...collection.tests,
                            test
                        ]
                    }
                })

                return {
                    ...page,
                    collections: collections
                }
            })
            return {
                pages: updatedPages
            }
        })
    },
    updateTestInCollection(pageId, collectionId, newTest) {
        set((state) => {

            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                const UpdatedCollections = page.collections.map((collection) => {
                    if (collection.id !== collectionId) return collection;

                    const updatedTests = collection.tests.map((test) => {
                        if (newTest.id !== test.id) return test;

                        return {
                            ...newTest
                        }
                    })
                    return {
                        ...collection,
                        tests: updatedTests
                    };
                })

                return {
                    ...page,
                    collections: UpdatedCollections
                }
            })

            return {
                pages: updatedPages
            }
        })
    },
    removeTestFromCollection(pageId, collectionId, testId) {
        set((state) => {

            const updatedPages = state.pages.map((page) => {
                if (page.id !== pageId) return page;

                const UpdatedCollections = page.collections.map((collection) => {
                    if (collection.id !== collectionId) return collection;

                    const updatedTests = collection.tests.filter((test) => test.id !== testId);
                    return {
                        ...collection,
                        tests: updatedTests
                    };
                })

                return {
                    ...page,
                    collections: UpdatedCollections
                }
            })

            return {
                pages: updatedPages
            }
        })
    },

    updateState(reportDate) {
        set(() => ({
            pages: reportDate
        }))
    },

    setSearchInput(inputText) {
        set(() => ({
            searchInput: inputText
        }))
    },
    setDoctors(docs) {
        set(() => ({ doctors: docs }))
    },

}));

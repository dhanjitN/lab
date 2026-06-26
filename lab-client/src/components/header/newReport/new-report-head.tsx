import { TypoH3 } from "../../Typography/typo-h3";

export default function NewReportHead() {
  return (
    <div className="text-center pb-2 underline ">
      <span>
        <TypoH3 text="Create New Report" />
        <h2 className="md:hidden">Create New Report</h2>
      </span>
    </div>
  );
}

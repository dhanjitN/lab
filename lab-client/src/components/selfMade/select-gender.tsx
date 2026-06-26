import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SelectGender({ value, onChange }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="flex gap-6">
      {["MALE", "FEMALE", "OTHER"].map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={option.toLowerCase()} />
          <Label htmlFor={option.toLowerCase()}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

import { SecretDataUser } from "@/pages/form";
import Select, { MultiValue, SingleValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

export const BranchesSelector = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const branches: OptionType[] = [
    { value: "BNN: Central Bangna", label: "BNN: Central Bangna" },
    { value: "Studio7: Mega Bangna", label: "Studio7: Central Bangna" },
    { value: "KKP: Mega Bangna", label: "KKP: Mega Bangna" },
  ];

  const handleChange = (selected: SingleValue<OptionType>) => {
    if (!selected) return;

    const newClaimData = { ...props.claimData };
    newClaimData.document.branches = selected.value;
    props.setClaimData(newClaimData);
  };

  // return (
  //   {data.length > 0 ? (
  //     <>
  //     {data.map((data, i) => {
  //       return (
  //         <Select
  //         key={i}
  //         styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
  //         placeholder="กรุณาเลือกสาขาที่ส่งเคลม"
  //         options={data.branches}
  //         onChange={handleChange}
  //       />
  //       )
  //     }</>
  //   )}
  // )

  // return (
  //   <>
  //     <Select
  //       styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
  //       placeholder="กรุณาเลือกสาขาที่ส่งเคลม"
  //       options={branches.map((d) => (
  //         <option value={d.value}>{d.label}</option>
  //       ))}
  //       required
  //       onChange={handleChange}
  //     />
  //   </>
  // );

  return (
    <>
      <Select
        styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
        placeholder="กรุณาเลือกสาขาที่ส่งเคลม"
        options={branches}
        required
        onChange={handleChange}
      />
    </>
  );
};

export const ProvinceSelector = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const province: OptionType[] = [
    { value: "Bangkok", label: "กรุงเทพ" },
    { value: "Chonburi", label: "ชลบุรี" },
    { value: "Nontaburi", label: "นนทบุรี" },
  ];

  const handleChange = (selected: SingleValue<OptionType>) => {
    if (!selected) return;
    const newClaimData = { ...props.claimData };
    newClaimData.document.province = selected.value;
    props.setClaimData(newClaimData);
  };

  return (
    <>
      <Select
        styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
        placeholder="กรุณาเลือกจังหวัดที่ส่งเคลม"
        options={province}
        onChange={handleChange}
        required
      />
    </>
  );
};

export const BrandSelector = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const brand: OptionType[] = [
    { value: "iphone", label: "iPhone" },
    { value: "samsung", label: "Samsung" },
    { value: "other", label: "อื่นๆ" },
  ];

  const handleChange = (selected: SingleValue<OptionType>) => {
    if (!selected) return;
    const newClaimData = { ...props.claimData };
    newClaimData.document.brand = selected.value;
    props.setClaimData(newClaimData);
  };
  return (
    <>
      <Select
        styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
        placeholder="กรุณาเลือกแบรนด์มือถือ"
        options={brand}
        onChange={handleChange}
        required
      />
    </>
  );
};

export const ModelSelector = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const model: OptionType[] = [
    { value: "iPhone 13", label: "iPhone 13" },
    { value: "Galaxy S", label: "Galaxy S" },
    { value: "Other", label: "อื่นๆ" },
  ];

  const handleChange = (seleceted: SingleValue<OptionType>) => {
    if (!seleceted) return;
    const newClaimData = { ...props.claimData };
    newClaimData.document.model = seleceted.value;
    props.setClaimData(newClaimData);
  };
  return (
    <>
      <Select
        styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
        placeholder="กรุณาเลือกรุ่นมือถือ"
        options={model}
        onChange={handleChange}
        required
      />
    </>
  );
};

export const FailureSelector = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const failure = [
    { value: "ไฟไม่เข้า/ไม่ขึ้นภาพ", label: "ไฟไม่เข้า/ไม่ขึ้นภาพ" },
    {
      value: "ซีดีไดร์ฟ/ลำโพง/เสียง/เว็บแคม/ยูเอสบีเสีย",
      label: "ซีดีไดร์ฟ/ลำโพง/เสียง/เว็บแคม/ยูเอสบีเสีย",
    },
    { value: "บู๊ดเครื่องไม่ได้", label: "บู๊ดเครื่องไม่ได้" },
    {
      value: "ปรากฎข้อความ(Operation System not Found)",
      label: "ปรากฎข้อความ(Operation System not Found)",
    },
    {
      value: "เครื่องแฮงค์/ช้า/รีสตาร์ท",
      label: "เครื่องแฮงค์/ช้า/รีสตาร์ท",
    },
  ];

  const handleChange = (selected: MultiValue<OptionType>) => {
    const newClaimData = { ...props.claimData };
    newClaimData.document.failure = selected.map((m) => m.value);
    props.setClaimData(newClaimData);
  };

  return (
    <>
      <Select
        isMulti
        placeholder="อาการเสียของเครื่อง"
        name="failure"
        styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
        options={failure}
        onChange={handleChange}
        required
      />
    </>
  );
};

export const AccessoriesSelector = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const accessories: OptionType[] = [
    { value: "แบตเตอร์รี่", label: "แบตเตอร์รี่" },
    { value: "สายไฟ", label: "สายไฟ" },
    { value: "Driver", label: "Driver" },
  ];

  const handleChange = (selected: MultiValue<OptionType>) => {
    const newClaimData = { ...props.claimData };
    newClaimData.document.accessories = selected.map((m) => m.value);
    props.setClaimData(newClaimData);
  };
  return (
    <>
      <Select
        isMulti
        name="accessories"
        placeholder="อุปกรณ์ที่นำมา"
        styles={{ option: (base) => ({ ...base, textAlign: "left" }) }}
        options={accessories}
        onChange={handleChange}
        required
      />
    </>
  );
};

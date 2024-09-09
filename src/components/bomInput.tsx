
import { Textarea } from '@mantine/core';
import { Input } from 'postcss';

// const BomSelect = ({ children, placeholder, onChange, value }) => (
//   <Select
//     placeholder={placeholder}
//     size="sm"
//     onChange={onChange}
//     value={value}

//     // onChange={(e) => setAdType(e.target.value)}
//     // value={adType}
//   >
//     {children}
//     {/* {Object.keys(AdTypes).map((type, key) => {
//       return (
//         <option key={key} value={AdTypes[type].id}>
//           {AdTypes[type].name}
//         </option>
//       );
//     })} */}
//   </Select>
// );

// const BomInput = ({ onChange, value, placeholder, lbl }) => {
//   <FormControl variant="floating" isRequired>
//     <Input onChange={onChange} value={value} placeholder={placeholder} />
//     <FormLabel>{lbl}</FormLabel>
//   </FormControl>;
// };

const BomArea = ({ placeholder, onChange, value }: {placeholder: string, onChange: (e: string) => void, value?: string}) => (
  <Textarea
    placeholder={placeholder}
   
    h="100px"
    className='whitespace-nowrap'
    onChange={(e) => onChange(e.target.value)}
    value={value}
    required
  />
);

export {  BomArea, };
// export { BomSelect, BomArea, BomInput };

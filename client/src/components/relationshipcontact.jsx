
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'



const RelationshipContact = () =>{

const relationships = ['friend', 'colleague', 'family']; 
  

  return (
    
      <div>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="relationship-select">Relationship</InputLabel>
        <Select
          label="Relationship"
          labelId="relationship-select"
          id="relationship-select"
        >
          {relationships.map((relationship) => (
            <MenuItem key={relationship} value={relationship}>
              {relationship}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


export default RelationshipContact;







import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(data) {
  const nameString = JSON.stringify(data);
  const obj =JSON.parse(nameString)
  const nameParts = obj.name.split(" ");
//   console.log( obj.name);
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
  return {
    sx: {
      bgcolor: stringToColor(obj.name.toString()),
    },
    children: `${firstNameInitial}${lastNameInitial}`,
  };
}


const AvatarNames = (propName) => {
  return (
    <>
         <Avatar sx={{ width: "24px", height: "24px", m: "0 5px 0 0" }} {...stringAvatar(propName)} />
    </>
  )
}

export default AvatarNames
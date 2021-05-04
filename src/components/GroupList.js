import React from 'react';
import GroupListDisplay from "./GroupListDisplay"
// import stylesheet from '../css/Group.css'

function GroupList({data})
{
  // render the UI
  if (data) {
    return (
      <div>
        {data.map((group) => {
          return <GroupListDisplay group={group} />;
        })}
      </div>
    )
  }
  return (null);
}

export default GroupList;

import { Avatar } from "@mui/material";
import Link from "next/link";

export default function SidebarListItem({ item }) {
return(
<Link className="link" href={`/?roomId=${item.id}`}>
<div className="sidebar__chat">
    <div className="avatar__container">
<Avatar 
src={item.photoURL || `https://avatars.dicebear.com/api/jdenticon/${item.id}.svg`}
style={{ height: "45px", width: "45px" }}
/>
    </div>
    <div className="sidebar__chat--info">
        <h2>{item.name}</h2>
    </div>
</div>
</Link>
);
};
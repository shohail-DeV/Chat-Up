import { Add, ExitToApp, Home, Message, PeopleAlt, SearchOutlined } from "@mui/icons-material";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import SidebarTab from "./SidebarTab";
import { useState } from "react";
import SidebarList from "./SidebarList";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "@/utils/firebase";
import useRooms from "@/hooks/useRooms";
import useUsers from "@/hooks/useUsers";
import useChats from "@/hooks/useChats";



const tabs = [{
    id: 1,
    icon: <Home />
},
{
    id: 2,
    icon: <Message />
},
{
    id: 3,
    icon: <PeopleAlt />
}]

export default function Sidebar({ user }) {

const [menu, setMenu] = useState(1);
const [isCreatingRoom, setCreatingRoom] = useState(false);
const [roomName, setRoomName] = useState("");
const [searchResults,setSearchResults] = useState([]);
const router = useRouter();
const rooms = useRooms();
const users = useUsers(user);
const chats = useChats(user);



async function createRoom() {
    if (roomName?.trim()){
        const roomsRef = collection(db, 'rooms')
        const newRoom = await addDoc(roomsRef,{
            name: roomName,
            timestamp: serverTimestamp(),
        });
        setCreatingRoom(false);
        setRoomName("");
        setMenu(2);
        router.push(`/?roomId=${newRoom.id}`);
    }
}


async function searchUsersAndRooms(event) {
    event.preventDefault();
  const searchValue = event.target.elements.search.value;
    const userQuery = query(collection(db, "users"), where("name","==",searchValue));
    const roomQuery = query(collection(db, "rooms"), where("name","==",searchValue));
  const userSnapshot = await getDocs(userQuery);
  const roomSnapshot = await getDocs(roomQuery);

const userResults = userSnapshot.docs.map((doc) => {
    const id = doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`;
    return { id, ...doc.data() };
});
const roomResults = roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
const searchResults = [...userResults, ...roomResults];
setMenu(4);
setSearchResults(searchResults);

}

    return (
   <div className="sidebar">
    {/* Header */ }
         <div className="sidebar__header">
         <div className="sidebar__header--left">
       <Avatar src={user?.photoURL} alt={user.displayName} />
       <h4>{user.displayName}</h4>
         </div>
            <div className="sidebar__header--right">
                <IconButton onClick={() => auth.signOut()}>
                    <ExitToApp/>
                </IconButton>
            </div>
        </div>

    {/* Search */ }
    <div className="sidebar__search">
    <form className="sidebar__search--container" onSubmit={searchUsersAndRooms}>
  <SearchOutlined />
  <input type="text" name="search" placeholder="Search for users or rooms" />
</form>
    </div>

    {/* Tabs */ }
<div className="sidebar__menu">
    {tabs.map((tab) => (
        <SidebarTab
        key={tab.id}
        onClick={() => setMenu(tab.id)}
        isActive={tab.id === menu}       
        >
            <div className="sidebar__menu--home">
                {tab.icon}
                <div className="sidebar__menu--line"/>
            </div>
        </SidebarTab>
    ))}
</div>

{menu === 1 ? (
    <SidebarList title="Chats" data={chats}/>
) : menu === 2 ? (
    <SidebarList title="Rooms" data={rooms}/>
) : menu === 3 ? (
    <SidebarList title="Users" data={users}/>
) : menu === 4 ? (
    <SidebarList title="Search Results" data={searchResults}/>
) : null}

    {/* Create room button */ }
    <div className="sidebar__chat--addRoom">
<IconButton onClick={() => setCreatingRoom(true)}>
    <Add />
</IconButton>
    </div>

    {/* Create room Dialog */}
    <Dialog maxWidth="sm" open={isCreatingRoom} onClose={() => setCreatingRoom(false)}>
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of your public room . Every user will be able to join this room.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={ event => setRoomName(event.target.value) }
            value={roomName}
            id="roomName"
            label="Room Name"
            type="text"
            fullWidth
            variant="filled"
            style={{ marginTop: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setCreatingRoom(false)}>Cancel</Button>
          <Button color="success" onClick={createRoom}>Submit</Button>
        </DialogActions>
      </Dialog>

 
   </div>
    );
};
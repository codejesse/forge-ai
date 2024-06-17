import { db } from "../util/firebase";
import { getDocs, setDoc, doc, getDoc, collection } from "firebase/firestore";

const collectionName = "schedules";
const colRef = collection(db, collectionName);

//function service to fetch schedules
export async function fetchAllSchedules() {
  const schedules = [];
  try {
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      const scheduleData = doc.data();
      scheduleData.id = doc.id; // Add the ID as a property to the data object
      schedules.push(scheduleData);
    });
  } catch (error) {
    console.log("Error fetching documents:", error);
  }
  return schedules;
}

//function service to fetch schedule with documentId
export async function fetchSchedule(documentId) {
  const schedule = [];
  const docRef = doc(colRef, documentId);
  try {
    const docSnap = await getDoc(docRef);
    schedule.push(docSnap.data());
  } catch (error) {
    console.log("Error fetching document:", error);
  }
  return schedule;
}

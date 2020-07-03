import React from 'react';
import SnapshotsList from '../../components/SnapshotListDir/SnapshotListTs';

interface SnapshotsContainerProps {
  // index of current snapshot rendered in devtool
  curRender: number,
  // array of object snapshots of user's state
  snapshotHistory: object[],
  // setState functionality to update curRender
  setCurRender: React.Dispatch<React.SetStateAction<number>>
}

const SnapshotsContainer: React.FC <SnapshotsContainerProps> = ({ curRender, snapshotHistory, setCurRender }) => {
  // functionality to postMessage the selected snapshot index to background.js
  const setSnapshotTimeTravelIndex = (index: number) => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'snapshotTimeTravel',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: { snapshotIndex: index },
    });
  };
  return (
    <div className="SnapshotsContainer">
      <h3>Snapshots</h3>
      <SnapshotsList
        curRender={curRender}
        snapshotHistory={snapshotHistory}
        setCurRender={setCurRender}
        setSnapshotTimeTravelIndex={setSnapshotTimeTravelIndex}
      />
    </div>
  );
};

export default SnapshotsContainer;

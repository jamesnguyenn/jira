import React, { memo, useCallback } from 'react';

import TaskLists from './TaskLists';

function ProjectDetailBody({ lstTask = [] }) {
    const handleOnDragStart = useCallback((e) => {
        console.log(e);
    }, []);
    return (
        <>
            <div className="cards">
                {/* Load Log */}
                {lstTask.length > 0 &&
                    lstTask.map((lstItem) => {
                        const { lstTaskDeTail, statusId } = lstItem;
                        return (
                            <div className="task" key={statusId}>
                                <div className="task__header">
                                    {lstItem.statusName}
                                </div>
                                <ul className="task__lists">
                                    {/* Load Task Item in Log */}
                                    {lstTaskDeTail.length > 0
                                        ? lstTaskDeTail.map(
                                              (lstTaskDeTailItem) => {
                                                  const priority =
                                                      lstTaskDeTailItem
                                                          ?.priorityTask
                                                          ?.priority;
                                                  const {
                                                      taskId: id,
                                                      taskName,
                                                      assigness: members,
                                                  } = lstTaskDeTailItem;

                                                  return (
                                                      <li
                                                          onDragStart={
                                                              handleOnDragStart
                                                          }
                                                          draggable={true}
                                                          className="task__item"
                                                          key={id}
                                                      >
                                                          <TaskLists
                                                              data={{
                                                                  taskName,
                                                                  priority,
                                                                  members,
                                                              }}
                                                          />
                                                      </li>
                                                  );
                                              }
                                          )
                                        : 'No Tasks'}
                                </ul>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default memo(ProjectDetailBody);

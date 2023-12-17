import React from "react";
import DateDisplay from "../Tasks/DateDisplay";
import Convert from "../Tasks/Convert";
import TagDisplay from "../Tasks/TagDisplay";

export default function MyTasks({ state, status }) {
    console.log(state)
  const uniqueTasks = state.lista.reduce((unique, task) => {
    const existingTask = unique.find((item) => item.status === task.status);

    if (!existingTask) {
      unique.push(task);
    }

    return unique;
  }, []);

  return (
    <div className="w-full h-full">
      <div className="col-12">
        <table className="container-fluid text-center pb-5" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr className="row" style={{ color: "#f1f1f1" }}>
              <th className="col-4">TaskName</th>
              <th className="col-2">TaskTag</th>
              <th className="col-2">Estimate</th>
              <th className="col-2">TaskAsignee Name</th>
              <th className="col-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {uniqueTasks.map((task, index) => (
              <React.Fragment key={index}>
                <tr className="row">
                  <td className="col-12" style={{ color: "#f1f1f1" }}>
                    <div className="flex justify-Between cSecundario pb-4 pt-4">
                      <h4>{task.status}</h4>
                    </div>
                  </td>
                </tr>
                {state.lista
                  .filter((list) => list.status === task.status)
                  .map((list, index) => (
                    <tr className="" key={list.id}>
                      <td className="col-3" style={{ color: "#f1f1f1",border: "1px solid #cccccc1e"  }}>
                        {list.name}
                      </td>
                      <td className="col-3" style={{ color: "#f1f1f1",border: "1px solid #cccccc1e"  }}>
                      <TagDisplay tags={list.tags} />
                      </td>
                      <td className="col-3" style={{ color: "#f1f1f1",border: "1px solid #cccccc1e"  }}>
                      <Convert task={list.pointEstimate}/>
                      </td>
                      <td className="col-3 flex items-center" style={{ color: "#f1f1f1",border: "1px solid #cccccc1e"  }}>
                          {/* <img src={list.assignee.avatar} alt='img' />{list.assignee.fullName} */}
                          <img className='rounded-full h-10' src='https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/321113121_852869196024893_2073418348360781553_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=YRlq2hh53jwAX-alplk&_nc_ht=scontent.fsal1-1.fna&oh=00_AfBiT5IGR0vEwxQ9wQb1V7r2-KNrl0QHsKl7GKYq6ouyDQ&oe=65847D10' alt='img' />
                          <h4 className="ml-3">{list.assignee.fullName}</h4>
                      </td>
                      <td className="col-3" style={{ border: "1px solid #cccccc1e"  }}>
                           <DateDisplay dueDate={list.dueDate} />
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

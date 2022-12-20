const ViewFeedback = ({feedbacks, auth}) => {
    return (
        <>
            <div className="flex flex-col bg-white border rounded-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden p-4">
                            <table className="min-w-full">
                                <thead className="border-b border-sky-500">
                                    <tr>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/12">
                                            No
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/4">
                                            Subject
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/2">
                                            Detail
                                        </th>
                                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left w-1/12">
                                            Creator
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-left divide-y divide-slate-200">
                                    {feedbacks
                                    .map((feedback,i) => {
                                        return(
                                            <>
                                                <tr key={i+1}>
                                                    <td className={`text-md p-6 ${feedback.username === auth.username && "text-sky-500"}`}>{i+1}</td>
                                                    <td className={`text-md p-6 ${feedback.username === auth.username && "text-sky-500"}`}>{feedback.subject}</td>
                                                    <td className={`text-md p-6 ${feedback.username === auth.username && "text-sky-500"}`}>{feedback.detail}</td>
                                                    <td className={`text-md p-6 font-bold ${feedback.username === auth.username && "text-sky-500"}`}>{feedback.username}</td>
                                                </tr>
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewFeedback;

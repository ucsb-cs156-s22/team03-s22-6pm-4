const helpRequestsFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "neelmurthy@ucsb.edu",
        "teamId": "s22-6pm-4",
        "tableOrBreakoutRoom": "table",
        "requestTime": "2022-01-02T12:00:00",
        "explanation": "merging conflicts",
        "solved": true
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "neelmurthy@ucsb.edu",
            "teamId": "s22-6pm-4",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2022-01-02T12:00:00",
            "explanation": "merging conflicts",
            "solved": true
        },
        {
            "id": 2,
            "requesterEmail": "phtcon@ucsb.edu",
            "teamId": "s22-6pm-3",
            "tableOrBreakoutRoom": "breakout room",
            "requestTime": "2022-01-02T12:03:00",
            "explanation": "splurging conflicts",
            "solved": false
        },
        {
            "id": 3,
            "requesterEmail": "mrconrad@ucsb.edu",
            "teamId": "s22-6pm-1",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2022-01-02T12:06:00",
            "explanation": "submerging conflicts",
            "solved": true
        }
    ]
};


export { helpRequestsFixtures };

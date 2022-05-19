import React from 'react';

import HelpRequestsTable from "main/components/HelpRequests/HelpRequestsTable";
import { helpRequestsFixtures } from 'fixtures/helpRequestsFixtures';

export default {
    title: 'components/HelpRequests/HelpRequestsTable',
    component: HelpRequestsTable
};

const Template = (args) => {
    return (
        <HelpRequestsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    helpRequests: []
};

export const ThreeRequests = Template.bind({});

ThreeRequests.args = {
    helpRequests: helpRequestsFixtures.threeRequests
};



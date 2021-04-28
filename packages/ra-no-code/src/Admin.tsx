import React from 'react';
import {
    Admin as RaAdmin,
    AdminProps as RaAdminProps,
    Resource,
} from 'react-admin';
import localStorageDataProvider from 'ra-data-local-storage';
import { Create, Edit, List } from './builders';
import {
    useResourcesConfiguration,
    ResourceConfigurationProvider,
} from './ResourceConfiguration';
import { Layout, Ready } from './ui';
import { Application } from './ApplicationsDashboard';

export const Admin = ({ application, ...props }: AdminProps) => {
    const dataProvider = localStorageDataProvider({
        localStorageKey: `@@ra-no-code/${application.name}/data`,
    });
    return (
        <ResourceConfigurationProvider
            dataProvider={dataProvider}
            storageKey={`@@ra-no-code/${application.name}`}
        >
            <InnerAdmin {...props} dataProvider={dataProvider} />
        </ResourceConfigurationProvider>
    );
};

const InnerAdmin = (props: RaAdminProps) => {
    const [resources] = useResourcesConfiguration();
    const hasResources = !!resources && Object.keys(resources).length > 0;
    return (
        <RaAdmin ready={Ready} layout={Layout} {...props}>
            {hasResources
                ? Object.keys(resources).map(resource => (
                      <Resource
                          key={resource}
                          name={resource}
                          options={{ label: resources[resource].label }}
                          list={List}
                          edit={Edit}
                          create={Create}
                      />
                  ))
                : undefined}
        </RaAdmin>
    );
};

interface AdminProps extends Omit<RaAdminProps, 'dataProvider'> {
    application: Application;
}

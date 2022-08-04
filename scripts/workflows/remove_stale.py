from ghapi.all import GhApi

api = GhApi(owner = 'capgemini-stavanger', repo = 'gi-en-jul', token='GH_PA_TOKEN')

if __name__ == "__main__":
    wfs = api.actions.list_repo_workflows()
    for flow in wfs.workflows:
        if flow.state == 'disabled_manually':
            print(flow.name);
            runs = api.actions.list_workflow_runs(flow.id);
            count = runs.total_count
            while count > 0:
                print(count);
                for run in runs.workflow_runs:
                    api.actions.delete_workflow_run(run.id);
                print();
                if count > 30:
                    runs = api.actions.list_workflow_runs(flow.id);
                    count = runs.total_count

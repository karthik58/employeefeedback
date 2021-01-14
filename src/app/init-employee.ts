export class Init {
    load() {
        if (localStorage.getItem('emps') === null || localStorage.getItem('emps') == undefined) {
            console.log('No employees Found... Creating...');
            let emps = [
                {
                    empid: 1,
                    name: 'Hydrogen',
                    project: 'one',
                    rating: 1.0079,
                    comments: 'good'
                },
                {
                    empid: 2, name: 'heilon', project: 'two', rating: 2.0079, comments: 'v good'
                },
                {
                    empid: 3, name: 'neon', project: 'three', rating: 3.0079, comments: 'bad'
                }
            ];

            localStorage.setItem('emps', JSON.stringify(emps));
            return
        } else {
            console.log('Found...');
        }
    }
}
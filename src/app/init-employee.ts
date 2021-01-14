export class Init {
    load() {
        if (localStorage.getItem('emps') === null || localStorage.getItem('emps') == undefined) {
            console.log('No employees Found... Creating...');
            let emps = [
                {
                    empid: 1,
                    name: 'Karthik',
                    project: 'Project1',
                    rating: 4.5,
                    comments: 'good learning path'
                },
                {
                    empid: 2, name: 'Prudhvi', project: 'Project2', rating: 5, comments: 'Great team'
                },
                {
                    empid: 3, name: 'Nick', project: 'Project3', rating: 4, comments: 'Good Project'
                }
            ];

            localStorage.setItem('emps', JSON.stringify(emps));
            return
        } else {
            console.log('Found...');
        }
    }
}
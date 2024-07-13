import { $route } from "@gyoza/route";

const handler =  $route(import.meta);

export default handler(({path}) => <Route path={path} />);

function Route({path}: {path: string}) {
    console.log(path)
	return <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis nihil animi autem iste minus eos hic? Magnam, aspernatur atque. Suscipit, dolores at. Laudantium, reiciendis quod velit aperiam dolorem at veniam odio, cum dolores consectetur quidem animi aliquid, architecto quasi culpa aliquam asperiores quis minus corporis repellendus quas modi minima. Natus aliquid harum atque tempore amet enim animi aperiam, similique iusto voluptatum est veritatis nostrum deserunt laborum corporis, in dolorum placeat provident! Et fugiat inventore nostrum eius modi ipsa asperiores, delectus eum accusantium? Quas voluptate suscipit tenetur non distinctio. Aspernatur porro quia repudiandae id quae nam molestiae eum? Temporibus, nobis est?</p>
}
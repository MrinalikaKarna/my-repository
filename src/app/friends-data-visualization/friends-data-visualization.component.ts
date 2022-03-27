import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, IHierarchyTreeData, User } from '../model/app.model';
import { selectState } from '../store/app.reducer';
import * as d3 from 'd3';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-friends-data-visualization',
  templateUrl: './friends-data-visualization.component.html',
  styleUrls: ['./friends-data-visualization.component.scss'],
})
export class FriendsDataVisualizationComponent implements AfterViewInit {
  @ViewChild('hierarchyTree') treeContainer: ElementRef;

  host: d3.Selection<d3.BaseType, {}, d3.BaseType, any>;
  svg: d3.Selection<SVGElement, {}, d3.BaseType, any>;
  margin = { top: 20, right: 90, bottom: 30, left: 90 };
  height: number;
  width: number;
  hierarchyTreeData: IHierarchyTreeData;

  constructor(private store: Store<IAppState>) {}

  ngAfterViewInit(): void {
    this.host = d3.select(this.treeContainer.nativeElement);
    this.store
      .select(selectState)
      .pipe(
        map((data) => data.AppState.UserData),
        map((data) => data.filter((item) => !!item.name))
      )
      .subscribe((data) => {
        this.hierarchyTreeData = {
          name: 'Friends',
          friends: data,
        };
        this.setup();
        this.createSvg(this.hierarchyTreeData);
      });
  }

  private setup(): void {
    this.width = 660 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  private createSvg(hierarchyData: IHierarchyTreeData): void {
    const treemap = d3.tree().size([this.height, this.width]);

    let nodes = d3.hierarchy(hierarchyData, (d: any) => d.friends);

    nodes = treemap(nodes);

    this.host.html('');
    this.svg = this.host
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    const g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    // create path between nodes - this is a straight line here
    g.selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', 'purple')
      .attr('d', (d: any) => {
        console.log(d);
        return (
          'M' + d.y + ',' + d.x + 'L' + d.parent.y + ',' + d.parent.x + 'Z'
        );
      });

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      .attr(
        'class',
        (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
      )
      .attr('transform', (d: any) => 'translate(' + d.y + ',' + d.x + ')');

    // adds the circle to the node
    node.append('circle').attr('r', 10).style('fill', 'red');

    // adds the text(name, age, weight) to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => (d.children ? (10 + 5) * -1 : 10 + 5))
      .attr('y', (d: any) => (d.children && d.depth !== 0 ? -(10 + 5) : 10))
      .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text(
        (d) =>
          d.data.name +
          (d.data.age ? `,${d.data.age}` : '') +
          (d.data.weight ? `,${d.data.weight}` : '')
      );
  }
}

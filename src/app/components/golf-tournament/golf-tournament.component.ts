import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GolfPlayerDataInfo } from 'src/app/dto/golf-tournament-details';
import { SocketService } from 'src/app/services/sockets/socket.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-golf-tournament',
  templateUrl: './golf-tournament.component.html',
  styleUrls: ['./golf-tournament.component.scss']
})
export class GolfTournamentComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'CalculatedRankInteger',
    'Eastern',
    'First',
    'InSTP',
    'InStrokes',
    'Last',
    'MSTID',
    'Match',
    'Nationality',
    'OutSTP',
    'OutStrokes',
    'SOD',
    'Score',
    'Sex',
    'SortPriority',
    'TVName',
    'Today',
    'TotalSTP',
    'TotalStrokes',
    'UniquePosition',
    'holesPlayed',
    'isTeam',
    'lastUpdated',
    'leaderboardID',
    'matchID',
    'orderInMatch',
    'position',
    'round',
    'teeStart',
    'teeTime',
    'tournamentID',

  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {

    this.socketService.on('data-update').subscribe((data: GolfPlayerDataInfo) => {
      this.dataSource.data.unshift(data); // Add new data to the beginning of the array
      this.dataSource._updateChangeSubscription(); // Trigger change detection
    },
      (error: any) => {
        // Error callback
        console.error('Error in receiving data-update event:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Filter search 
  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getColumnHeader(column: string): string {
    // based on the column name. For simplicity, it just returns the column name.
    return column;
  }

}

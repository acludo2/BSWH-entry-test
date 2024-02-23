//
//  RTCSnapshotModule.m
//  AwesomeProject
//
//  Created by cesar angulo on 22/02/24.
//

// RCTCalendarModule.m
#import "RTCSnapshotModule.h"
#import <React/RCTLog.h>


@implementation RCTCalendarModule

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end
